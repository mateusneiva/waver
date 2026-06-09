import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "pause",
    description: "Pause the current track.",
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (player.isPaused())
        return message.reply({
          embeds: [WarningEmbed("<:pause:1501939031376658542> \u200b\u200b Player is already paused")],
        });

      player.pause();

      const embed = InfoEmbed("<:pause:1501939031376658542> \u200b\u200b Player paused");

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
