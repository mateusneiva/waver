import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed, usageEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "jump",
    usage: "p!jump <track-index>",
    description: "Jump to the specified song in queue",
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const guild = message.member.guild;

    const position = Number(args[0]);

    if (!position) {
      return message.reply({ embeds: [usageEmbed(__filename, "Missing parameter: track index in queue.")] });
    }

    if (!Number.isInteger(position) || position < 1) {
      return message.reply({ embeds: [usageEmbed(__filename, "Invalid index: use an integer greater than zero.")] });
    }

    try {
      const player = usePlayer(guild);

      const track = player.queue.tracks.data[position - 1];

      if (!track) {
        return message.reply({ embeds: [WarningEmbed("Track index out of queue range.")] });
      }

      player.skipTo(track);

      const embed = InfoEmbed(`Jump to [${player.queue.currentTrack.title}](${player.queue.currentTrack.url})`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
