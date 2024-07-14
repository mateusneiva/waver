import { Client, Message } from 'discord.js';
import { usePlayer } from 'discord-player';
import { HelpEmbed, InfoEmbed } from '@/modules/embeds';

module.exports = {
  data: {
    name: 'loop',
    usage: 'paia!loop <queue | track | off>',
    description: 'Toggles looping the current playing song',
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const guild = message.member.guild;

    const loopMode = args[0];

    if (!loopMode) return message.reply({ embeds: [HelpEmbed(__filename)] });

    const player = usePlayer(guild);

    try {
      let mode: number | null = null;

      if (loopMode === 'queue') {
        mode = 2;
      }

      if (loopMode === 'track') {
        mode = 1;
      }

      if (loopMode === 'off') {
        mode = 0;
      }

      if (mode === null) {
        return message.reply({ embeds: [HelpEmbed(__filename)] });
      }

      player.queue.setRepeatMode(mode);

      const embed = InfoEmbed(loopMode === 'off' ? `Loop off` : `Loop set to ${loopMode}`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply(`Something went wrong.`);
    }
  },
};
