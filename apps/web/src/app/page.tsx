"use client";

import Image from "next/image";

import { Button } from "../components/UI/Button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { Embed } from "../components/Embed";

import { Footer } from "../components/Footer";
import { Slider } from "../components/Slider";
import { Section } from "../components/Section";

import SpotifyIcon from "../assets/icons/SpotifyIcon";
import ShuffleIcon from "../assets/icons/ShuffleIcon";
import LinkIcon from "../assets/icons/LinkIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import TwitchIcon from "../assets/icons/TwitchIcon";
import YoutubeIcon from "../assets/icons/YoutubeIcon";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />

      <div className="flex justify-center items-center w-full h-[600px] bg-memphisPattern">
        <div className="flex justify-center items-center w-full min-h-full bg-gradient-to-r from-transparent via-zinc-950 to-transparent">
          <Section delay={0}>
            <div className="flex flex-col justify-center items-center text-center w-[700px]">
              <Image
                src="/images/bot_profile.webp"
                alt="Bot image"
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-lime-400 shadow-[0px_0px_30px_-1px_#a3e635]"
              />
              <h1 className="text-5xl font-bold leading-tight mt-4">
                Waver is a multi-purpose bot
              </h1>

              <p className="pt-5 text-zinc-400 font-base text-lg w-[650px]">
                Waver is an versatile bot designed to play music and offer a
                range of other functionalities, providing users with a seamless
                and enjoyable experience.
              </p>

              <div className="flex gap-4 pt-5">
                <Button
                  color="primary"
                  className="rounded-full text-black px-10 font-semibold w-full"
                  target="_blank"
                  href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&permissions=8&integration_type=0&scope=bot"
                >
                  Invite to server
                </Button>

                <Button
                  href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+gdm.join+email+guilds.join+connections"
                  className="rounded-full px-10 font-semibold w-full"
                >
                  Dashboard
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <Slider />

      <div className="w-full flex flex-col items-center pb-28 gap-32">
        <div className="w-full flex justify-center bg-visiwigDots py-20">
          <Section delay={0.1}>
            <div className="flex flex-col gap-4 relative">
              <div className="flex flex-col justify-center">
                <p className="uppercase text-xs font-semibold tracking-widest text-lime-400">
                  Feature
                </p>
                <h2 className="text-4xl font-bold leading-tight">
                  Music Player
                </h2>
              </div>

              <Accordion variant="shadow" className="w-[600px] bg-zinc-900">
                <AccordionItem
                  key="1"
                  aria-label="Waver supports a wide variety of sources"
                  subtitle="Press to expand"
                  title="Waver supports a wide variety of sources"
                  startContent={<LinkIcon />}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionItem>

                <AccordionItem
                  key="2"
                  aria-label="You can shuffle or repeat your playlist"
                  subtitle={<span>Press to expand</span>}
                  title="You can shuffle or repeat your playlist"
                  startContent={<ShuffleIcon />}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionItem>

                <AccordionItem
                  key="3"
                  aria-label="Instead of getting a link you can search directly through the bot"
                  subtitle="Press to expand"
                  title="Search directly through the bot"
                  startContent={<SearchIcon />}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex flex-col gap-8">
              <Embed
                username="Neon"
                avatarSrc="/images/embeds/neon.webp"
                message={
                  <p className="flex gap-1">
                    p!play
                    <strong className="text-blue-400 font-normal hover:underline">
                      https://open.spotify.com/playlist/66ve61QvKq7tZKfR4pfWtT
                    </strong>
                  </p>
                }
              />

              <Embed
                username="Waver"
                avatarSrc="/images/bot_profile.webp"
                isBot
              >
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <SpotifyIcon />

                      <h3 className="font-bold">Added Playlist</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="font-bold">Playlist</p>
                        <p className="text-blue-400 hover:underline">
                          ninguém sabe o que se passa na cabeça do palhaço
                        </p>
                      </div>

                      <div className="flex gap-10">
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
                    className="rounded-md w-20 h-20"
                  />
                </div>
              </Embed>

              <Embed
                username="Waver"
                avatarSrc="/images/bot_profile.webp"
                isBot
              >
                <div className="flex items-center gap-2">
                  <SpotifyIcon />

                  <h3>
                    Started playing &#8203;
                    <strong className="text-sm font-bold hover:underline text-blue-400">
                      Book of Revelation
                    </strong>
                  </h3>
                </div>
              </Embed>
            </div>
          </Section>
        </div>

        <Section delay={0.2}>
          <div className="flex flex-col gap-4 relative">
            <div className="flex flex-col justify-center">
              <p className="uppercase text-xs font-semibold tracking-widest text-lime-400">
                Feature
              </p>
              <h2 className="text-4xl font-bold leading-tight">Alerts</h2>
            </div>

            <Accordion variant="shadow" className="w-[600px] bg-zinc-900">
              <AccordionItem
                key="1"
                aria-label="Waver supports a wide variety of sources"
                subtitle="Press to expand"
                title="Twitch Alerts"
                startContent={<TwitchIcon />}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="Youtube Alerts"
                subtitle={<span>Press to expand</span>}
                title="Youtube Alerts"
                startContent={<YoutubeIcon />}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col gap-8">
            <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xs">Twitch</h3>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-blue-400 hover:underline">
                      Guizado_Gamer - Twitch
                    </h3>

                    <p className="break-all ">
                      E SE EU TE DISSER QUE EU NÃO SEI OQUE ESCREVER, OQUE VOCÊ
                      ME DIRIA?
                    </p>
                  </div>
                </div>

                <Image
                  src="/images/embeds/guizado_gamer.webp"
                  alt="Guizado_Gamer Picture"
                  width={350}
                  height={350}
                  className="rounded-md w-20 h-20"
                />
              </div>
            </Embed>

            <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xs">Twitch</h3>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-blue-400 hover:underline">
                      luscamasfei - Twitch
                    </h3>

                    <p className="break-all ">
                      voltei a jogar e olha no que deu. !discord !coach !webcam
                      !pix
                    </p>
                  </div>
                </div>

                <Image
                  src="/images/embeds/luscamasfei.webp"
                  alt="luscamasfei Picture"
                  width={350}
                  height={350}
                  className="rounded-md w-20 h-20"
                />
              </div>
            </Embed>
          </div>
        </Section>

        <Section delay={0.3}>
          <div className="flex flex-col gap-4 relative">
            <div className="flex flex-col justify-center">
              <p className="uppercase text-xs font-semibold tracking-widest text-lime-400">
                Feature
              </p>
              <h2 className="text-4xl font-bold leading-tight">Commands</h2>
            </div>

            <Accordion variant="shadow" className="w-[600px] bg-zinc-900">
              <AccordionItem
                key="1"
                aria-label="Mod Commands"
                subtitle="Press to expand"
                title="Mod Commands"
                startContent={<LinkIcon />}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="AI Commands"
                subtitle={<span>Press to expand</span>}
                title="AI Commands"
                startContent={<ShuffleIcon />}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionItem>

              <AccordionItem
                key="3"
                aria-label="Custom Commands"
                subtitle={<span>Press to expand</span>}
                title="Custom Commands"
                startContent={<ShuffleIcon />}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col gap-8">
            <Embed
              username="Neon"
              avatarSrc="/images/bot_profile.webp"
              message={
                <p className="flex gap-1">
                  p!play
                  <strong className="text-blue-400 font-normal hover:underline ">
                    https://open.spotify.com/playlist/66ve61QvKq7tZKfR4pfWtT
                  </strong>
                </p>
              }
            />

            <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <SpotifyIcon />

                    <h3 className="font-bold">Added Playlist</h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="font-bold">Playlist</p>
                      <p>ninguém sabe o que se passa na cabeça do palhaço</p>
                    </div>

                    <div className="flex gap-10">
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
                  className="rounded-md w-20 h-20"
                />
              </div>
            </Embed>

            <Embed username="Waver" avatarSrc="/images/bot_profile.webp" isBot>
              <div className="flex items-center gap-2">
                <SpotifyIcon />

                <h3>
                  Started playing &#8203;
                  <strong className="text-sm font-bold hover:underline text-blue-400">
                    Book of Revelation
                  </strong>
                </h3>
              </div>
            </Embed>
          </div>
        </Section>
      </div>

      <div className="flex justify-center items-center h-[300px] w-full bg-herringbonePattern border-t border-zinc-900">
        <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-r from-transparent via-zinc-950 to-transparent">
          <h3 className="text-4xl font-bold leading-tight pb-5">
            Get started with Waver
          </h3>

          <Button className="rounded-full bg-lime-400 text-black font-bold px-10">
            Invite to server
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
