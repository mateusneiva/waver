import { Client, Events } from 'discord.js';

module.exports = {
  data: {
    name: Events.ClientReady,
  },

  execute: async (client: Client) => {
    console.log(`Discord: Logged in as ${client.user.tag}!`);
  },
};
