import { Client, Message } from 'discord.js';
import { QueryType, useMainPlayer } from 'discord-player';
import { BaseEmbed, getSourceIcon, HelpEmbed, WarningEmbed } from '../../modules/embeds';

const SPOTIFY_DEFAULT_THUMBNAIL = 'https://www.scdn.co/i/_global/twitter_card-default.jpg';

function isSpotifyDefaultThumbnail(thumbnail?: string | null) {
  return thumbnail === SPOTIFY_DEFAULT_THUMBNAIL;
}

function isSpotifyTrack(track: { source?: string | null; url?: string | null; raw?: { source?: string | null } }) {
  return (
    track.source === 'spotify' ||
    track.raw?.source === 'spotify' ||
    /^https?:\/\/(open\.)?spotify\.com\//i.test(track.url ?? '')
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

function getSearchEngine(query: string) {
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(query)) {
    return query.includes('list=') ? QueryType.YOUTUBE_PLAYLIST : QueryType.YOUTUBE_VIDEO;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/track\//i.test(query)) {
    return QueryType.SPOTIFY_SONG;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/playlist\//i.test(query)) {
    return QueryType.SPOTIFY_PLAYLIST;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/album\//i.test(query)) {
    return QueryType.SPOTIFY_ALBUM;
  }

  return QueryType.AUTO;
}

module.exports = {
  data: {
    name: 'play',
    usage: 'paia!play <url>',
    description: 'Play a song or playlist by providing a link or query',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const channel = message.member.voice.channel;

    if (!channel) return message.reply({ embeds: [WarningEmbed('You need to be in a voice channel')] });

    const query = args.toString().split(',').join(' ');

    if (!query) return message.reply({ embeds: [HelpEmbed(__filename)] });

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
        },
      });

      if (!searchResult) {
        return message.reply({ embeds: [WarningEmbed('No results found')] });
      }

      const isPlaylist = searchResult.hasPlaylist();
      const sourceIcon = getSourceIcon(track.raw.source);
      const sourcePrefix = sourceIcon ? `${sourceIcon}\u200b\u200b ` : '';

      if(queue.size === 0) {
        return;  
      }

      const embedThumbnail =
        isSpotifyTrack(track) && isSpotifyDefaultThumbnail(track.thumbnail)
          ? await resolveSpotifyThumbnail(isPlaylist ? searchResult.playlist.url : track.url, track.thumbnail)
          : track.thumbnail;

      const playEmbed = isPlaylist
        ? BaseEmbed()
            .setDescription(`${sourcePrefix} **Added Playlist**`)
            .setFields(
              { name: 'Playlist', value: `**[${searchResult.playlist.title}](${searchResult.playlist.url})**` },
              { name: 'Playlist Length', value: `${searchResult.playlist.durationFormatted}`, inline: true },
              { name: 'Tracks', value: `${searchResult.playlist.tracks.length}`, inline: true },
            )
        : BaseEmbed()
            .setDescription(`${sourcePrefix} **Added Track**`)
            .setFields(
              { name: 'Track', value: `**[${track.title}](${track.url})**` },
              { name: 'Track Length', value: `${track.duration}`, inline: true },
              { name: 'Position in queue', value: `${queue.size}`, inline: true },
            );

      if (embedThumbnail) {
        playEmbed.setThumbnail(embedThumbnail);
      }

      return message.reply({ embeds: [playEmbed] });
    } catch (error) {
      return message.reply('Something went wrong');
    }
  },
};
