import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "clear",
    description: "Clear the queue",
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (!player?.queue || player.queue.size === 0) {
        return message.reply({ embeds: [WarningEmbed("Queue is already empty.")] });
      }

      player.queue.tracks.clear();

      const embed = InfoEmbed("Queue cleared");

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
