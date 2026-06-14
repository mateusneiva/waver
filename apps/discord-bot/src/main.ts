import { ActivityType, Client, GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import { Player } from "discord-player";
import { DefaultExtractors } from "@discord-player/extractor";
import { YoutubeExtractor } from "discord-player-youtubei";
import "dotenv/config";

import { loadEvents } from "./handlers/events";
import { loadCommands } from "./handlers/commands";
import { registerPlayerStreamHooks } from "./modules/playerStream";
import { readFileSync } from "fs";
import { resolve } from "path";

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

  await player.extractors.register(YoutubeExtractor, {
    disablePlayer: true,
    cookie: readFileSync(resolve(process.cwd(), "cookies.txt"), "utf-8"),
  });

  await client.login(DISCORD_BOT_TOKEN);
  loadCommands(client);
  loadEvents(client);
}

bootstrap().catch((error) => {
  console.error("[Bootstrap Error]", error);
});
