import { QueryType } from "discord-player";

export function getSearchEngine(query: string) {
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(query)) {
    return query.includes("list=") ? QueryType.YOUTUBE_PLAYLIST : QueryType.YOUTUBE_VIDEO;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/track\//i.test(query)) {
    return QueryType.SPOTIFY_SONG;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/playlist\//i.test(query)) {
    return QueryType.SPOTIFY_PLAYLIST;
  }

  if (/^(https?:\/\/)?(open\.)?spotify\.com\/album\//i.test(query)) {
    return QueryType.SPOTIFY_ALBUM;
  }

  return QueryType.AUTO;
}
