import type { Player } from "discord-player";
import { GuildQueueEvent } from "discord-player";

export function registerPlayerStreamHooks(player: Player) {
  player.on("debug", (message) => {
    console.log(`[Player Debug] ${message}`);
  });

  player.events.on("debug", (queue, message) => {
    console.log(`[Queue Debug ${queue.guild.name}] ${message}`);
  });

  player.events.on(GuildQueueEvent.PlayerError, (queue, error, track) => {
    console.error(`[Player Error ${queue.guild.name}] Track: ${track?.title}`, error);
  });

  player.events.on(GuildQueueEvent.PlayerSkip, (queue, track, reason, description) => {
    console.warn(`[Player Skip ${queue.guild.name}] Track: ${track?.title} | Reason: ${reason} | ${description}`);
  });

  player.events.on(GuildQueueEvent.Error, (queue, error) => {
    console.error(`[Queue Error ${queue.guild.name}]`, error);
  });
}
