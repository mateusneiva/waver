import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { InfoEmbed, WarningEmbed } from '../../modules/embeds';

module.exports = {
  data: {
    name: 'resume',
    description: 'Resume the current track.',
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (!player.isPaused()) return message.reply({ embeds: [WarningEmbed('<:play:1501938994752127018> \u200b\u200b Player is already running')] });

      player.resume();

      const embed = InfoEmbed('<:play:1501938994752127018> \u200b\u200b Player resumed');

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
