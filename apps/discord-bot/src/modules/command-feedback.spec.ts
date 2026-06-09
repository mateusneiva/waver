import { describe, expect, it } from "vitest";
import { commandErrorEmbed } from "./command-feedback";

describe("commandErrorEmbed", () => {
  it("returns queue-specific message", () => {
    const embed = commandErrorEmbed(new Error("Queue is empty")).toJSON();
    expect(embed.description).toContain("queue");
  });

  it("returns network-specific message", () => {
    const embed = commandErrorEmbed(new Error("fetch failed")).toJSON();
    expect(embed.description).toContain("network");
  });
});
