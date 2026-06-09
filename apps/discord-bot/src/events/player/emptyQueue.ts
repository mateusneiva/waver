import { GuildQueueEvent } from "discord-player";
import { WarningEmbed } from "../../modules/embeds";

export const data = {
  name: GuildQueueEvent.EmptyQueue,
  type: "player",
};

export async function execute(queue, track) {
  if (!queue.metadata?.channel) {
    return;
  }

  queue.metadata.disconnectReason = "timeout";

  const embed = WarningEmbed("Queue Empty. If it stays empty, I will leave the channel in 5 minutes.");

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
