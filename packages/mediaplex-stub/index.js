/**
 * mediaplex stub
 *
 * Replaces the real mediaplex native addon via pnpm.overrides.
 * Any property access throws, causing @discordjs/voice and
 * @discord-player/extractor to catch the error and fall back
 * to ffmpeg for all audio processing.
 */
module.exports = new Proxy(
  {},
  {
    get(_target, prop) {
      throw new Error(
        `[mediaplex-stub] '${String(prop)}' is not available — ffmpeg will be used instead.`
      );
    },
    construct(_target, _args, newTarget) {
      throw new Error(
        `[mediaplex-stub] '${newTarget.name}' is not available — ffmpeg will be used instead.`
      );
    },
  }
);
