import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed, usageEmbed } from "../../modules/command-feedback";
import { InfoEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "volume",
    usage: "p!volume <0-100>",
    description: "Set the player volume",
  },

  execute: async (client: Client, message: Message, args: string[]) => {
    const guild = message.member.guild;

    const volume = args[0];

    if (!volume) {
      return message.reply({ embeds: [usageEmbed(__filename, "Missing parameter: volume value from 0 to 100.")] });
    }

    const parsedVolume = Number(volume);
    if (!Number.isFinite(parsedVolume) || parsedVolume < 0 || parsedVolume > 100) {
      return message.reply({ embeds: [usageEmbed(__filename, "Invalid volume: use a number between 0 and 100.")] });
    }

    try {
      const player = usePlayer(guild);

      player.setVolume(parsedVolume);

      const embed = InfoEmbed(`Volume set to ${volume}`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
