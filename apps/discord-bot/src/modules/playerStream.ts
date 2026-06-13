import { Readable } from "node:stream";
import { onBeforeCreateStream, Player, QueryType } from "discord-player";

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
    let targetTrack = track;

    if (isSpotifyTrack(queryType, track)) {
      const result = await player.search(`${track.author} - ${track.title}`, {
        requestedBy: track.requestedBy ?? undefined,
        searchEngine: QueryType.YOUTUBE_SEARCH,
      });

      const bridgedTrack = result.tracks[0];
      if (bridgedTrack?.extractor) {
        track.bridgedTrack = bridgedTrack;
        track.bridgedExtractor = bridgedTrack.extractor;
        targetTrack = bridgedTrack;
      }
    }

    if (!targetTrack.extractor) {
      return null;
    }

    try {
      const stream = await targetTrack.extractor.stream(targetTrack);

      if (typeof stream === "string") {
        return stream;
      }

      if (stream && typeof stream === "object" && "url" in stream && typeof stream.url === "string") {
        return stream.url;
      }

      if (stream instanceof Readable) {
        return stream;
      }

      if (stream && stream.stream) {
        return stream.stream;
      }

      return null;
    } catch {
      return null;
    }
  });
}
