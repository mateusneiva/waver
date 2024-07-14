import { GuildQueueEvent } from 'discord-player';
import { InfoEmbed, WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.EmptyChannel,
  type: 'player',
};

export async function execute(queue, track) {
  const embed = WarningEmbed(`Empty Channel`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
