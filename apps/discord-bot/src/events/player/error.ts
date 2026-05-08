import { GuildQueue } from 'discord-player';

export const data = {
  name: 'error',
  type: 'player',
};

export async function execute(queue: GuildQueue, error: Error) {
  console.error(`[Error] na guild ${queue.guild.name}:`, error.message);
  console.error(error);
  if (error.stack) {
    console.error(error.stack);
  }
}
