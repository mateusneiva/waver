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

  onBeforeCreateStream(async (track, queryType) => {
    if (!isSpotifyTrack(queryType, track)) {
      return null;
    }

    const result = await player.search(`${track.author} - ${track.title}`, {
      requestedBy: track.requestedBy ?? undefined,
      searchEngine: QueryType.YOUTUBE_SEARCH,
    });

    const bridgedTrack = result.tracks[0];

    if (!bridgedTrack?.extractor) {
      return null;
    }

    track.bridgedTrack = bridgedTrack;
    track.bridgedExtractor = bridgedTrack.extractor;

    try {
      const stream = await bridgedTrack.extractor.stream(bridgedTrack);

      if (stream instanceof Readable) {
        return stream;
      }

      if (stream && typeof stream === "object" && "stream" in stream) {
        return (stream as { stream: Readable }).stream;
      }

      return null;
    } catch {
      return null;
    }
  });

}
