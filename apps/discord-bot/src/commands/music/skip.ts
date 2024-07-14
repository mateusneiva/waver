import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { InfoEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'skip',
    description: 'Skip the current track',
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      player.skip();

      const track = player.queue.currentTrack;

      const embed = InfoEmbed(`${track.raw.source === 'spotify' && '<:spotify:1184885826228867144> '}\u200b\u200b **[${track.title}](${track.url})** has been skipped`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
