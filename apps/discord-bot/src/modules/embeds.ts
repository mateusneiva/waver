import { Colors, EmbedBuilder, EmbedData } from 'discord.js';

export const BaseEmbed = (data?: EmbedData, color: number = Colors.Blurple) => new EmbedBuilder(data).setColor(color);

export const ErrorEmbed = (text: string) => BaseEmbed({ description: text }, Colors.Red);

export const SuccessEmbed = (text: string) => BaseEmbed({ description: text }, Colors.Green);

export const WarningEmbed = (text: string) => BaseEmbed({ description: text }, Colors.DarkOrange);

export const InfoEmbed = (text: string) => BaseEmbed({ description: text }, Colors.Blurple);

export function HelpEmbed(filename: string) {
  const { data } = require(filename);

  return BaseEmbed().setDescription(`**Usage:** ${data.usage} \n **Description:** ${data.description}`).setAuthor({ name: data.name }).setColor('#78A1FD');
}
