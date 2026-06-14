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

function isSoundCloudTrack(queryType: string, track: { source?: string; raw?: { source?: string } }) {
  return (
    queryType === QueryType.SOUNDCLOUD_TRACK || track.source === "soundcloud" || track.raw?.source === "soundcloud"
  );
}

async function bridgeToYoutube(track: any, player: Player): Promise<Readable | null> {
  const result = await player.search(`${track.author} - ${track.title}`, {
    requestedBy: track.requestedBy ?? undefined,
    searchEngine: QueryType.YOUTUBE_SEARCH,
  });

  const ytTrack = result.tracks[0];
  if (!ytTrack?.extractor) return null;

  const stream = await ytTrack.extractor.stream(ytTrack);
  if (!stream) return null;

  if (stream instanceof Readable) return stream;

  if (typeof stream === "string") {
    const res = await fetch(stream);
    if (!res.body) throw new Error("Failed to fetch bridged stream");
    return Readable.fromWeb(res.body as never);
  }

  return (stream as any).stream ?? null;
}

export function registerPlayerStreamHooks(player: Player) {
  player.on("debug", (message) => {
    console.log(`[Player Debug] ${message}`);
  });

  player.events.on("debug", (queue, message) => {
    console.log(`[Queue Debug ${queue.guild.name}] ${message}`);
  });

  onBeforeCreateStream(async (track, queryType) => {
    if (isSpotifyTrack(queryType, track) || isSoundCloudTrack(queryType, track)) {
      return bridgeToYoutube(track, player);
    }

    return null;
  });
}
