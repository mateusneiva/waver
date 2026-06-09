import { EmbedBuilder } from "discord.js";
import { ErrorEmbed, WarningEmbed } from "./embeds";

type CommandData = {
  usage?: string;
  description?: string;
};

function getCommandData(filename: string): CommandData {
  try {
    const commandModule = require(filename);
    return commandModule?.data ?? {};
  } catch {
    return {};
  }
}

export function usageEmbed(filename: string, details?: string): EmbedBuilder {
  const command = getCommandData(filename);
  const usage = command.usage ?? "p!<command>";
  const description = command.description ?? "Use this command with the expected parameters.";

  const detailLine = details ? `\n\n${details}` : "";

  return WarningEmbed(`Incorrect usage.\n\n**Correct usage:** ${usage}\n**Description:** ${description}${detailLine}`);
}

export function commandErrorEmbed(error: unknown): EmbedBuilder {
  if (!(error instanceof Error)) {
    return ErrorEmbed("Unexpected error while running the command. Please try again in a few seconds.");
  }

  const reason = error.message.toLowerCase();

  if (reason.includes("not connected") || reason.includes("voice")) {
    return ErrorEmbed("I could not access your voice channel. Rejoin the channel and try again.");
  }

  if (reason.includes("queue")) {
    return ErrorEmbed("I could not access the queue. Make sure something is playing first.");
  }

  if (reason.includes("network") || reason.includes("fetch")) {
    return ErrorEmbed("Temporary network issue while loading media. Try again in a moment.");
  }

  return ErrorEmbed("Command failed unexpectedly. Please try again or use `p!help`.");
}
