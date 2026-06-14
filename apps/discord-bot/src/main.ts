import { ActivityType, Client, GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import { Player, QueryType } from "discord-player";
import { DefaultExtractors } from "@discord-player/extractor";
import { YoutubeExtractor } from "discord-player-youtubei";
import "dotenv/config";

import { loadEvents } from "./handlers/events";
import { loadCommands } from "./handlers/commands";
import { registerPlayerStreamHooks } from "./modules/playerStream";
import { readFileSync } from "fs";
import { resolve } from "path";

function parseNetscapeCookies(cookieString: string): string {
  return cookieString
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("#") && line.trim() !== "")
    .map((line) => {
      const parts = line.split("\t");
      if (parts.length >= 7) {
        // parts[5] is name, parts[6] is value
        return `${parts[5]}=${parts[6]}`;
      }
      return "";
    })
    .filter(Boolean)
    .join("; ");
}

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
  throw new Error("Missing DISCORD_BOT_TOKEN. Set it in apps/discord-bot/.env before starting the bot.");
}

const client = new Client({
  presence: {
    status: PresenceUpdateStatus.Idle,
    activities: [{ name: "p!help", type: ActivityType.Listening }],
  },
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

const player = new Player(client, {
  skipFFmpeg: false,
  blockStreamFrom: ["com.discord-player.spotifyextractor"],
});

registerPlayerStreamHooks(player);

async function bootstrap() {
  await player.extractors.loadMulti(DefaultExtractors);

  const rawCookies = readFileSync(resolve(process.cwd(), "cookies.txt"), "utf-8");
  await player.extractors.register(YoutubeExtractor, {
    disablePlayer: true,
    cookie: parseNetscapeCookies(rawCookies),
    createStream: async (track, ext) => {
      const result = await player.search(`${track.author} - ${track.title}`, {
        requestedBy: track.requestedBy ?? undefined,
        searchEngine: QueryType.YOUTUBE_SEARCH,
      });

      const ytTrack = result.tracks[0];
      if (!ytTrack) throw new Error("No YouTube track found");

      return ext.stream(ytTrack) as unknown as Promise<string>;
    },
  });

  await client.login(DISCORD_BOT_TOKEN);
  loadCommands(client);
  loadEvents(client);
}

bootstrap().catch((error) => {
  console.error("[Bootstrap Error]", error);
});
