import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "stop",
    description: "Stop and clear the queue",
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (!player?.queue) {
        return message.reply({ embeds: [WarningEmbed("Nothing to stop. The queue is already empty.")] });
      }

      (player.queue.metadata as { disconnectReason?: string }).disconnectReason = "manualStop";

      player.queue.delete();

      const embed = InfoEmbed("Waver left the channel 👋");

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
