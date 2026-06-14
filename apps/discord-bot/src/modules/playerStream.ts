import { Readable } from "node:stream";
import { onBeforeCreateStream, type Player, QueryType } from "discord-player";

function isSpotifyTrack(queryType: string, track: { source?: string; url?: string; raw?: { source?: string } }) {
  return (
    queryType === QueryType.SPOTIFY_SONG ||
    track.source === "spotify" ||
    track.raw?.source === "spotify" ||
    /^https?:\/\/(open\.)?spotify\.com\/track\//i.test(track.url ?? "")
  );
}

export function registerPlayerStreamHooks(player: Player) {
  player.on("debug", (message) => {
    console.log(`[Player Debug] ${message}`);
  });

  player.events.on("debug", (queue, message) => {
    console.log(`[Queue Debug ${queue.guild.name}] ${message}`);
  });

  player.events.on("playerError", (queue, error, track) => {
    console.error("[playerError]", error.message, error.stack);
  });

  player.events.on("error", (queue, error) => {
    console.error("[error]", error.message, error.stack);
  });

  onBeforeCreateStream(async (track, queryType) => {
    if (
      queryType === QueryType.SOUNDCLOUD_TRACK ||
      track.source === "soundcloud" ||
      track.raw?.source === "soundcloud"
    ) {
      if (!track.extractor) return null;

      const stream = await track.extractor.stream(track);

      if (!stream) return null;

      if (stream instanceof Readable) return stream;

      if (typeof stream === "string") {
        const response = await fetch(stream, {
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
          },
        });

        if (!response.body) throw new Error("Failed to fetch SoundCloud stream");

        return Readable.fromWeb(response.body as never);
      }

      return (stream as any).stream as Readable;
    }

    // if (!isSpotifyTrack(queryType, track)) {
    //   return null;
    // }

    // const result = await player.search(`${track.author} - ${track.title}`, {
    //   requestedBy: track.requestedBy ?? undefined,
    //   searchEngine: QueryType.YOUTUBE_SEARCH,
    // });

    // const bridgedTrack = result.tracks[0];

    // if (!bridgedTrack?.extractor) {
    //   return null;
    // }

    // track.bridgedTrack = bridgedTrack;
    // track.bridgedExtractor = bridgedTrack.extractor;

    // const stream = await bridgedTrack.extractor.stream(bridgedTrack);

    // if (!stream) {
    //   return null;
    // }

    // if (stream instanceof Readable) {
    //   return stream;
    // }

    // if (typeof stream === "string") {
    //   const response = await fetch(stream);

    //   if (!response.body) {
    //     throw new Error("Failed to create bridged YouTube stream");
    //   }

    //   return Readable.fromWeb(response.body as never);
    // }

    // return stream.stream;
  });
}
