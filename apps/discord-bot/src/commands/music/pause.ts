import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { BaseEmbed, InfoEmbed, WarningEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'pause',
    description: 'Pause the current track.',
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (player.isPaused()) return message.reply({ embeds: [WarningEmbed('Player is already pause')] });

      player.pause();

      const embed = InfoEmbed('<:pausefill:1184262871786467429> \u200b\u200b Player paused');

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
