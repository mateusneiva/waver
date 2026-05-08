import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { HelpEmbed, InfoEmbed } from '../../modules/embeds';

module.exports = {
  data: {
    name: 'jump',
    usage: 'paia!jump <track index>',
    description: 'Jump to the specified song in queue',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const guild = message.member.guild;

    const position = Number(args[0]);

    if (!position) return message.reply({ embeds: [HelpEmbed(__filename)] });

    try {
      const player = usePlayer(guild);

      const track = player.queue.tracks.data[position - 1];

      if (!track) return;

      player.skipTo(track);

      const embed = InfoEmbed(`Jump to [${player.queue.currentTrack.title}](${player.queue.currentTrack.url})`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
