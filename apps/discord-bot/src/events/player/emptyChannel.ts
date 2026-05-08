import { GuildQueueEvent } from 'discord-player';
import { WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.EmptyChannel,
  type: 'player',
};

export async function execute(queue, track) {
  if (!queue.metadata?.channel) {
    return;
  }

  const embed = WarningEmbed(`Empty Channel`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
