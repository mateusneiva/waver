import { GuildQueueEvent } from 'discord-player';
import { InfoEmbed, WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.EmptyQueue,
  type: 'player',
};

export async function execute(queue, track) {
  const embed = WarningEmbed(`Queue Empty`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
