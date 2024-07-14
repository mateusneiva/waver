import { GuildQueue, GuildQueueEvent, Track } from 'discord-player';
import { InfoEmbed } from '../../modules/embeds';
import { SpotifyExtractor } from '@discord-player/extractor';

export const data = {
  name: GuildQueueEvent.PlayerStart,
  type: 'player',
};

export async function execute(queue, track: Track) {
  const embed = InfoEmbed(`${track.raw.source === 'spotify' && '<:spotify:1184885826228867144> '}\u200b\u200b Started playing **[${track.title}](${track.url})**`);

  await queue.metadata.channel.send({
    embeds: [embed],
  });
}
