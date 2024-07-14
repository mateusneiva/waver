import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { HelpEmbed, InfoEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'remove',
    usage: 'paia!remove <trackIndex>',
    description: 'Remove a track from queue!',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const position = Number(args[0]);

    if (!position) return message.reply({ embeds: [HelpEmbed(__filename)] });

    const guild = message.member.guild;

    const player = usePlayer(guild);

    try {
      const track = player.queue.tracks.data[position - 1];

      player.queue.removeTrack(track);

      const embed = InfoEmbed(`[${track.title}](${track.url}) has been removed`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply('Something went wrong.');
    }
  },
};
