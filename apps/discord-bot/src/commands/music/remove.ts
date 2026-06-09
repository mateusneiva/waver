import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed, usageEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "remove",
    usage: "p!remove <track-index>",
    description: "Remove a track from queue!",
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const position = Number(args[0]);

    if (!position) {
      return message.reply({ embeds: [usageEmbed(__filename, "Missing parameter: track index in queue.")] });
    }

    if (!Number.isInteger(position) || position < 1) {
      return message.reply({ embeds: [usageEmbed(__filename, "Invalid index: use an integer greater than zero.")] });
    }

    const guild = message.member.guild;

    const player = usePlayer(guild);

    try {
      const track = player.queue.tracks.data[position - 1];

      if (!track) {
        return message.reply({ embeds: [WarningEmbed("Track index out of queue range.")] });
      }

      player.queue.removeTrack(track);

      const embed = InfoEmbed(`**[${track.title}](${track.url})** has been removed`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
