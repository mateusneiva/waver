import { Client, Message } from "discord.js";
import { usePlayer } from "discord-player";
import { commandErrorEmbed } from "../../modules/command-feedback";
import { InfoEmbed, WarningEmbed } from "../../modules/embeds";

module.exports = {
  data: {
    name: "skip",
    description: "Skip the current track",
  },

  execute: async (client: Client, message: Message) => {
    const guild = message.member.guild;

    try {
      const player = usePlayer(guild);

      if (!player?.queue?.currentTrack) {
        return message.reply({ embeds: [WarningEmbed("There is no track playing right now.")] });
      }

      player.skip();

      const track = player.queue.currentTrack;
      const embed = InfoEmbed(`**[${track.title}](${track.url})** has been skipped`);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      return message.reply({ embeds: [commandErrorEmbed(error)] });
    }
  },
};
