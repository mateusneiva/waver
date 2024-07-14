import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { HelpEmbed, InfoEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'volume',
    usage: 'paia!volume <volume number>',
    description: 'Set the player volume',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const guild = message.member.guild;

    const volume = args[0];

    if (!volume) return message.reply({ embeds: [HelpEmbed(__filename)] });

    try {
      const player = usePlayer(guild);

      player.setVolume(Number(volume));

      const embed = InfoEmbed(`Volume set to ${volume}`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply('Something went wrong.');
    }
  },
};
