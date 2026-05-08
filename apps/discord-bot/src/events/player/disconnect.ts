import { GuildQueueEvent } from 'discord-player';
import { WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.Disconnect,
  type: 'player',
};

export async function execute(queue, track) {
  if (!queue.metadata?.channel) {
    return;
  }

  const embed = WarningEmbed(`Disconnected from Channel 😭`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
