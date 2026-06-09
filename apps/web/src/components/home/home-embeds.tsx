import Image from "next/image";

import SpotifyIcon from "../../assets/icons/spotify-icon";
import { Embed } from "../embed";

type AlertEmbedProps = {
  imageAlt: string;
  imageSrc: string;
  streamName: string;
  description: string;
};

type CommandMessageEmbedProps = {
  avatarSrc: string;
};

export function CommandMessageEmbed({ avatarSrc }: CommandMessageEmbedProps) {
  return (
    <Embed
      username="Neon"
      avatarSrc={avatarSrc}
      message={
        <p className="flex flex-wrap gap-1 break-all">
          p!play
          <strong className="text-blue-400 font-normal hover:underline break-all">
            https://open.spotify.com/playlist/66ve61QvKq7tZKfR4pfWtT
          </strong>
        </p>
      }
    />
  );
}

export function PlaylistAddedEmbed() {
  return (
    <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
      <div className="flex gap-4 min-w-0">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <SpotifyIcon />

            <h3 className="font-bold">Added Playlist</h3>
          </div>

          <div className="flex flex-col gap-3 min-w-0">
            <div className="min-w-0">
              <p className="font-bold">Playlist</p>
              <p className="text-blue-400 hover:underline break-words">ninguém sabe o que se passa na cabeça do palhaço</p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <p className="font-bold">Playlist Length</p>
                <p>02:48:18</p>
              </div>

              <div>
                <p className="font-bold">Tracks</p>
                <p>47</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/images/embeds/track.webp"
          alt="Track image"
          width={80}
          height={80}
          className="rounded-md w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 self-start"
        />
      </div>
    </Embed>
  );
}

export function NowPlayingEmbed() {
  return (
    <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
      <div className="flex items-center gap-2 flex-wrap">
        <SpotifyIcon />

        <h3>
          Started playing &#8203;
          <strong className="text-sm font-bold hover:underline text-blue-400">Book of Revelation</strong>
        </h3>
      </div>
    </Embed>
  );
}

export function AlertEmbed({ imageAlt, imageSrc, streamName, description }: AlertEmbedProps) {
  return (
    <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
      <div className="flex gap-4 min-w-0">
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <h3 className="font-bold text-xs">Twitch</h3>

          <div className="flex flex-col gap-2 min-w-0">
            <h3 className="font-bold text-blue-400 hover:underline truncate">{streamName}</h3>

            <p className="break-words text-sm">{description}</p>
          </div>
        </div>

        <Image src={imageSrc} alt={imageAlt} width={350} height={350} className="rounded-md w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 self-start" />
      </div>
    </Embed>
  );
}
