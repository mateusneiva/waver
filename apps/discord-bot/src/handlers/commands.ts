import { Client, Collection } from 'discord.js';
import { sync } from 'glob';

export async function loadCommands(client: Client) {
  const commandFiles = sync('./src/commands/**/*.ts||.js');

  client.commands = new Collection();

  for (const file of commandFiles) {
    const command = await import(`../../${file}`);

    if (!command.data?.name) {
      throw new TypeError(`The command at ${file} is missing a required "data.name" property.`);
    }

    if (!command.data?.description) {
      throw new TypeError(`The command at ${file} is missing a required "data.description" property.`);
    }

    if (typeof command.execute !== 'function') {
      throw new TypeError(`The command at ${file} is missing a required "execute" function.`);
    }

    const cmdName = command.data.name;
    client.commands.set(cmdName, command);
  }
}
