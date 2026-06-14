import { Readable, PassThrough } from "node:stream";
import type { Player } from "discord-player";

export function patchSoundCloudStream(player: Player) {
  const extractor = player.extractors.get("com.discord-player.soundcloudextractor");

  if (!extractor) {
    console.warn("[Patch] SoundCloud extractor not found — patch not applied");
    return;
  }

  console.log("[Patch] Patching SoundCloud extractor stream method");

  const original = extractor.stream.bind(extractor);

  extractor.stream = async (track) => {
    const result = await original(track);
    console.log("[Patch] SoundCloud stream type:", typeof result);

    if (typeof result !== "string") return result;

    const res = await fetch(result, {
      headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" },
    });

    if (!res.body) throw new Error("Failed to fetch SoundCloud stream");

    console.log("[Patch] SoundCloud stream fetched, status:", res.status);
    
    const readable = Readable.fromWeb(res.body as never, {
      highWaterMark: 1024 * 512, // 512KB de buffer
    });

    let totalBytes = 0;
    const passThrough = new PassThrough();

    readable.on("data", (chunk) => {
      totalBytes += chunk.length;
      console.log("[Patch] chunk received:", chunk.length, "total:", totalBytes);
    });

    readable.on("end", () => console.log("[Patch] stream ended, total bytes:", totalBytes));
    readable.on("error", (err) => console.error("[Patch] stream error:", err));

    readable.pipe(passThrough);
    
    return passThrough;
  };
}
