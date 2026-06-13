import { Readable } from "node:stream";
import { onBeforeCreateStream, onAfterCreateStream, Player, QueryType, StreamType } from "discord-player";

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

  // Handle Spotify → YouTube bridging
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

  // Force all streams through FFmpeg by setting type to Arbitrary.
  // This prevents opusscript from receiving raw HLS data (which crashes it).
  // When type is Arbitrary, discord-voip spawns FFmpeg to decode the stream
  // to PCM before passing it to OpusEncoder.
  onAfterCreateStream(async (stream) => {
    return {
      stream,
      type: StreamType.Arbitrary,
    };
  });
}

