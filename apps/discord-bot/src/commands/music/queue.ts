import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { BaseEmbed, WarningEmbed } from '../../modules/embeds';

module.exports = {
  data: {
    name: 'queue',
    description: 'Get a list of the full queue',
  },

  execute: async (client: Client, message: Message) => {
    try {
      const player = usePlayer(message.guildId);

      if (!player || !player.queue) return message.reply({ embeds: [WarningEmbed('Nothing in queue!')] });

      const embed = BaseEmbed()
        .setTitle(`${player.queue.size} tracks in queue! (1/${Math.ceil(player.queue.size / 10)})`)
        .setDescription(
          `${player.queue.tracks
            .filter((item, index) => index < 10)
            .map((track, index) => {
              return `${index}. [${track.author} - ${track.title}](${track.url}) [${track.duration}]\n`;
            })
            .join('')}
          
          \n
          `,
        )
        .setFooter({ text: `Queue Duration: ${player.queue.durationFormatted}` });

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply('Something went wrong');
    }
  },
};
