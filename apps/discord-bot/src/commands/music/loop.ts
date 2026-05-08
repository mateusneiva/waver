import { Client, Message } from 'discord.js';
import { QueueRepeatMode, usePlayer } from 'discord-player';
import { HelpEmbed, InfoEmbed } from '../../modules/embeds';

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
      let mode: QueueRepeatMode | null = null;

      if (loopMode === 'queue') {
        mode = QueueRepeatMode.QUEUE;
      }

      if (loopMode === 'track') {
        mode = QueueRepeatMode.TRACK;
      }

      if (loopMode === 'off') {
        mode = QueueRepeatMode.OFF;
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
