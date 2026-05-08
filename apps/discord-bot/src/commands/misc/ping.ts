import { BaseEmbed } from '../../modules/embeds';
import { Client, Message } from 'discord.js';

module.exports = {
  data: {
    name: 'ping',
    description: 'Replies with Pong!',
    permission: 'Administrator',
  },

  execute: async (client: Client, message: Message) => {
    const embed = BaseEmbed()
      .setTitle('Pong')
      .addFields(
        { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
        { name: '\u200B', value: `\u200B`, inline: true },
        { name: 'API Latency', value: `${client.ws.ping}ms`, inline: true },
      );

    return message.reply({ embeds: [embed] });
  },
};

// .setColor('#78A1FD')
