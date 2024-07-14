import { Base, Client, Message } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { BaseEmbed, HelpEmbed, WarningEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'play',
    usage: 'paia!play <url>',
    description: 'Play a song or playlist by providing a link or query',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const channel = message.member.voice.channel;

    if (!channel) return message.reply({ embeds: [WarningEmbed('You need to be in a voice channel')] });

    const query = args.toString();

    if (!query) return message.reply({ embeds: [HelpEmbed(__filename)] });

    const mainPlayer = useMainPlayer();

    try {
      const { searchResult, track, queue } = await mainPlayer.play(channel, query, { requestedBy: message.author, nodeOptions: { volume: 10, selfDeaf: true } });

      queue.setMetadata({ channel: message.channel });

      if (!searchResult) {
        return message.reply({ embeds: [WarningEmbed('No results found')] });
      }

      const isPlaylist = searchResult.hasPlaylist();

      const playEmbed = isPlaylist
        ? BaseEmbed()
            .setDescription(`${track.raw.source === 'spotify' && '<:spotify:1184885826228867144> '}\u200b\u200b **Added Playlist**`)
            .setThumbnail(track.thumbnail)
            .setFields(
              { name: 'Playlist', value: `**[${searchResult.playlist.title}](${searchResult.playlist.url})**` },
              { name: 'Playlist Length', value: `${searchResult.playlist.durationFormatted}`, inline: true },
              { name: 'Tracks', value: `${searchResult.playlist.tracks.length}`, inline: true },
            )
        : BaseEmbed()
            .setDescription(`${track.raw.source === 'spotify' && '<:spotify:1184885826228867144> '}\u200b\u200b **Added Track**`)
            .setThumbnail(track.thumbnail)
            .setFields(
              { name: 'Track', value: `**[${track.title}](${track.url})**` },
              { name: 'Track Length', value: `${track.duration}`, inline: true },
              { name: 'Position in queue', value: `${queue.size}`, inline: true },
            );

      return message.reply({ embeds: [playEmbed] });
    } catch (error) {
      return message.reply('Something went wrong');
    }
  },
};
