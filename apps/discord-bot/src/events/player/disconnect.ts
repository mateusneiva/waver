import { GuildQueueEvent } from 'discord-player';
import { InfoEmbed, WarningEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.Disconnect,
  type: 'player',
};

export async function execute(queue, track) {
  const embed = WarningEmbed(`Disconnected from Channel 😭`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
