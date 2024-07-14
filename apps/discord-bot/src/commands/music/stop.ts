import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { InfoEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'stop',
    description: 'Stop and clear the queue',
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      player.queue.delete();

      const embed = InfoEmbed('Paia left the channel 👋');

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply('Something went wrong.');
    }
  },
};
