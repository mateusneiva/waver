import { GuildQueueEvent } from 'discord-player';
import { WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.EmptyQueue,
  type: 'player',
};

export async function execute(queue, track) {
  if (!queue.metadata?.channel) {
    return;
  }

  const embed = WarningEmbed(`Queue Empty`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
