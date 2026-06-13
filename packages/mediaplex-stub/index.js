/**
 * mediaplex stub
 *
 * Replaces the real mediaplex native addon via pnpm.overrides.
 * Throws on require() so @discordjs/voice, @discord-player/opus, and
 * @discord-player/extractor all fail fast and fall back to ffmpeg.
 */
const error = new Error("mediaplex is not available on this platform — ffmpeg will be used instead.");
error.code = "MODULE_NOT_FOUND";
throw error;
