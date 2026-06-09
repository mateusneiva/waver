import { Colors, EmbedBuilder, EmbedData } from "discord.js";

const SOURCE_ICONS: Record<string, string> = {
  spotify: "<:spotify:1501935603313410268>",
  youtube: "<:youtube:1501935763217055855>",
  youtubemusic: "<:youtube:1501935763217055855>",
  deezer: "<:deezer:1501935899800506649>",
  applemusic: "<:apple_music:1501936292110405744>",
  soundcloud: "<:soundcloud:1501937401180983436>",
};

const PRIMARY_COLOR = 0x84cc16;

export const BaseEmbed = (data?: EmbedData, color = PRIMARY_COLOR) => new EmbedBuilder(data).setColor(color);

export const ErrorEmbed = (text: string) => BaseEmbed({ description: text }, Colors.Red);

export const SuccessEmbed = (text: string) => BaseEmbed({ description: text }, PRIMARY_COLOR);

export const WarningEmbed = (text: string) => BaseEmbed({ description: text }, Colors.DarkOrange);

export const InfoEmbed = (text: string) => BaseEmbed({ description: text }, PRIMARY_COLOR);

export function getSourceIcon(source?: string | null) {
  const normalizedSource = source?.toLowerCase().replace(/[^a-z]/g, "");

  return normalizedSource ? (SOURCE_ICONS[normalizedSource] ?? "") : "";
}

export function HelpEmbed(filename: string) {
  const { data } = require(filename);

  return BaseEmbed()
    .setDescription(`**Usage:** ${data.usage} \n **Description:** ${data.description}`)
    .setAuthor({ name: data.name })
    .setColor("#78A1FD");
}
