import { Message, ChannelType, Events } from 'discord.js';

module.exports = {
  data: {
    name: Events.MessageCreate,
  },

  execute: async (message: Message) => {
    if (message.author.bot || message.channel.type === ChannelType.DM) return;

    const prefix: string = 'p!';

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandInput = args.shift().toLowerCase();

    if (!commandInput.length) return;

    const command = message.client.commands.get(commandInput);

    if (!command) return;

    try {
      if (command.data?.permission && !message.member.permissions.has(command.data?.permission)) {
        await message.reply({
          content: 'You do not have the permission to use this command.',
        });

        return;
      }

      command.execute(message.client, message, args);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  },
};
