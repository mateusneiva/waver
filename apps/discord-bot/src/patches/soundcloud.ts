import { Readable } from "node:stream";
import type { Player } from "discord-player";

export function patchSoundCloudStream(player: Player) {
  const extractor = player.extractors.get("com.discord-player.soundcloudextractor");
  if (!extractor) return;

  const original = extractor.stream.bind(extractor);

  extractor.stream = async (track) => {
    const result = await original(track);
    if (typeof result !== "string") return result;

    const res = await fetch(result, {
      headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" },
    });

    if (!res.body) throw new Error("Failed to fetch SoundCloud stream");
    return Readable.fromWeb(res.body as never);
  };
}
