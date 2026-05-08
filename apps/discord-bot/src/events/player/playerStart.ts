import { GuildQueueEvent, Track } from 'discord-player';
import { getSourceIcon, InfoEmbed } from '../../modules/embeds';

export const data = {
  name: GuildQueueEvent.PlayerStart,
  type: 'player',
};

export async function execute(queue, track: Track) {
  if (!queue.metadata?.channel) {
    return;
  }

  const sourceIcon = getSourceIcon(track.raw.source);
  const embed = InfoEmbed(`${sourceIcon ? `${sourceIcon}\u200b\u200b ` : ''}Now playing **[${track.title}](${track.url})**`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
