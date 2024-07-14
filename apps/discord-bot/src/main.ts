import { ActivityType, Client, GatewayIntentBits, PresenceUpdateStatus } from 'discord.js';
import { Player } from 'discord-player';
import 'dotenv/config';

import { loadEvents } from './handlers/events';
import { loadCommands } from './handlers/commands';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  presence: {
    status: PresenceUpdateStatus.Idle,
    activities: [{ name: 'p!help', type: ActivityType.Listening }],
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

const player = new Player(client);
player.extractors.loadDefault();

client.login(DISCORD_BOT_TOKEN).then(() => {
  loadCommands(client);
  loadEvents(client);
});
