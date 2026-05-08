import { GuildQueue } from 'discord-player';

export const data = {
  name: 'playerError',
  type: 'player',
};

export async function execute(queue: GuildQueue, error: Error) {
  console.error(`[Player Error] na guild ${queue.guild.name}:`, error.message);
  console.error(error);
  if (error.stack) {
    console.error(error.stack);
  }
}
