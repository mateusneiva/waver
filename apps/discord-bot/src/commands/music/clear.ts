import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { InfoEmbed } from '../../modules/embeds';

module.exports = {
  data: {
    name: 'clear',
    description: 'Clear the queue',
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      player.queue.tracks.clear();

      const embed = InfoEmbed('Queue clear')

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
