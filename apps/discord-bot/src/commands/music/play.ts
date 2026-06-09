import { Client, Message } from "discord.js";
import { useMainPlayer } from "discord-player";
import { commandErrorEmbed, usageEmbed } from "../../modules/command-feedback";
import { BaseEmbed, getSourceIcon, WarningEmbed } from "../../modules/embeds";
import { getSearchEngine } from "../../modules/search-engine";

const SPOTIFY_DEFAULT_THUMBNAIL = "https://www.scdn.co/i/_global/twitter_card-default.jpg";

function isSpotifyDefaultThumbnail(thumbnail?: string | null) {
  return thumbnail === SPOTIFY_DEFAULT_THUMBNAIL;
}

function isSpotifyTrack(track: { source?: string | null; url?: string | null; raw?: { source?: string | null } }) {
  return (
    track.source === "spotify" ||
    track.raw?.source === "spotify" ||
    /^https?:\/\/(open\.)?spotify\.com\//i.test(track.url ?? "")
  );
}

async function resolveSpotifyThumbnail(url: string, fallback?: string | null) {
  try {
    const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);

    if (!response.ok) return fallback ?? null;

    const data = (await response.json()) as { thumbnail_url?: string };

    return data.thumbnail_url ?? fallback ?? null;
  } catch {
    return fallback ?? null;
  }
}

module.exports = {
  data: {
    name: "play",
    usage: "p!play <url-or-search-query>",
    description: "Play a song or playlist by providing a link or query",
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const channel = message.member.voice.channel;

    if (!channel) return message.reply({ embeds: [WarningEmbed("You need to be in a voice channel")] });

    const query = args.toString().split(",").join(" ");

    if (!query) {
      return message.reply({ embeds: [usageEmbed(__filename, "Missing parameter: provide a URL or a search query.")] });
    }

    const mainPlayer = useMainPlayer();

    try {
      const searchEngine = getSearchEngine(query);

      const { searchResult, track, queue } = await mainPlayer.play(channel, query, {
        requestedBy: message.author,
        searchEngine,
        nodeOptions: {
          metadata: { channel: message.channel },
          selfDeaf: true,
          disableBiquad: true,
          disableEqualizer: true,
          disableVolume: true,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300_000,
        },
      });

      if (!searchResult) {
        return message.reply({ embeds: [WarningEmbed("No results found")] });
      }

      const isPlaylist = searchResult.hasPlaylist();
      const sourceIcon = getSourceIcon(track.raw.source);
      const sourcePrefix = sourceIcon ? `${sourceIcon} ` : "";

      if (queue.size === 0) {
        return;
      }

      const embedThumbnail =
        isSpotifyTrack(track) && isSpotifyDefaultThumbnail(track.thumbnail)
          ? await resolveSpotifyThumbnail(isPlaylist ? searchResult.playlist.url : track.url, track.thumbnail)
          : track.thumbnail;

      const playEmbed = isPlaylist
        ? BaseEmbed()
            .setDescription(`${sourcePrefix} \u200b\u200b **Added Playlist**`)
            .setFields(
              { name: "Playlist", value: `**[${searchResult.playlist.title}](${searchResult.playlist.url})**` },
              { name: "Playlist Length", value: `${searchResult.playlist.durationFormatted}`, inline: true },
              { name: "Tracks", value: `${searchResult.playlist.tracks.length}`, inline: true },
            )
        : BaseEmbed()
            .setDescription(`${sourcePrefix} \u200b\u200b **Added Track**`)
            .setFields(
              { name: "Track", value: `**[${track.title}](${track.url})**` },
              { name: "Track Length", value: `${track.duration}`, inline: true },
              { name: "Position in queue", value: `${queue.size}`, inline: true },
            );

      if (embedThumbnail) {
        playEmbed.setThumbnail(embedThumbnail);
      }

      return message.reply({ embeds: [playEmbed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
