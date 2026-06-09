import { QueryType } from "discord-player";
import { describe, expect, it } from "vitest";
import { getSearchEngine } from "./search-engine";

describe("getSearchEngine", () => {
  it("returns youtube playlist for list URLs", () => {
    expect(getSearchEngine("https://www.youtube.com/watch?v=abc123&list=PL123")).toBe(QueryType.YOUTUBE_PLAYLIST);
  });

  it("returns spotify song for track URL", () => {
    expect(getSearchEngine("https://open.spotify.com/track/abc123")).toBe(QueryType.SPOTIFY_SONG);
  });

  it("returns auto for plain text query", () => {
    expect(getSearchEngine("metallica one live")).toBe(QueryType.AUTO);
  });
});
