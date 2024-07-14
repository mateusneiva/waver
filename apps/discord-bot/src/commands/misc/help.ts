import { BaseEmbed } from '@/modules/embeds';
import { Client, Message } from 'discord.js';

module.exports = {
  data: {
    name: 'help',
    description: 'View all the possible commands!',
  },

  execute: async (client: Client, message: Message) => {
    const embed = BaseEmbed()
      .setTitle('Commands (1/1)')
      .setDescription(
        '**Getting Started** \n **help**: Help command \n **setup**: *Setup command with some common setup options* \n **ping**: *Get my ping to Discord* \n \n **Player** \n **play**: *Play a song or playlist by providing a link or query* \n **queue**: *Get a list of the full queue* \n **pause**: *Pause the current track* \n **stop**: *Stop and clear the queue* \n **skip**: *Skip the current track* \n **jump**: *Jump to the specified song in queue* \n **skip**: *Skip the current track* \n **clear**: *Clear the queue*',
      );

    return message.reply({ embeds: [embed] });
  },
};
