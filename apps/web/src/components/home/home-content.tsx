import LinkIcon from "../../assets/icons/link-icon";
import SearchIcon from "../../assets/icons/search-icon";
import ShuffleIcon from "../../assets/icons/shuffle-icon";
import TwitchIcon from "../../assets/icons/twitch-icon";
import YoutubeIcon from "../../assets/icons/youtube-icon";
import type { FeatureAccordionItem } from "../ui/accordion";

const musicAccordionItems: FeatureAccordionItem[] = [
  {
    key: "1",
    ariaLabel: "Waver supports a wide variety of sources",
    subtitle: "Press to expand",
    title: "Waver supports a wide variety of sources",
    startContent: <LinkIcon />,
    content: (
      <>
        Play music from links, playlists, and multiple popular platforms without forcing members to switch between
        tools. Waver keeps the queue flowing with reliable source support and a simple command flow.
      </>
    ),
  },
  {
    key: "2",
    ariaLabel: "You can shuffle or repeat your playlist",
    subtitle: <span>Press to expand</span>,
    title: "You can shuffle or repeat your playlist",
    startContent: <ShuffleIcon />,
    content: (
      <>
        Keep listening sessions dynamic with shuffle, repeat, and queue controls that are easy to use in the middle of a
        voice session. Members can adjust playback without interrupting the vibe.
      </>
    ),
  },
  {
    key: "3",
    ariaLabel: "Instead of getting a link you can search directly through the bot",
    subtitle: "Press to expand",
    title: "Search directly through the bot",
    startContent: <SearchIcon />,
    content: (
      <>
        Search for tracks directly from Discord when you do not have a link on hand. Waver helps users find songs faster
        and start playback with less friction.
      </>
    ),
  },
];

const alertsAccordionItems: FeatureAccordionItem[] = [
  {
    key: "1",
    ariaLabel: "Twitch Alerts",
    subtitle: "Press to expand",
    title: "Twitch Alerts",
    startContent: <TwitchIcon />,
    content: (
      <>
        Send automatic updates when your favorite streamers go live so the server never misses an important broadcast.
        Waver keeps communities informed without requiring manual checks.
      </>
    ),
  },
  {
    key: "2",
    ariaLabel: "Youtube Alerts",
    subtitle: <span>Press to expand</span>,
    title: "Youtube Alerts",
    startContent: <YoutubeIcon />,
    content: (
      <>
        Notify your community when a new video is published and keep everyone up to date with creator activity. It is a
        simple way to turn your server into a shared follow hub.
      </>
    ),
  },
];

const commandsAccordionItems: FeatureAccordionItem[] = [
  {
    key: "1",
    ariaLabel: "Mod Commands",
    subtitle: "Press to expand",
    title: "Mod Commands",
    startContent: <LinkIcon />,
    content: (
      <>
        Moderate your server with practical commands that help manage users, channels, and day-to-day administration.
        Waver keeps common staff actions close at hand.
      </>
    ),
  },
  {
    key: "2",
    ariaLabel: "AI Commands",
    subtitle: <span>Press to expand</span>,
    title: "AI Commands",
    startContent: <ShuffleIcon />,
    content: (
      <>
        Use AI-powered commands to speed up repetitive tasks, generate useful responses, and add smarter interactions to
        your server experience.
      </>
    ),
  },
  {
    key: "3",
    ariaLabel: "Custom Commands",
    subtitle: <span>Press to expand</span>,
    title: "Custom Commands",
    startContent: <ShuffleIcon />,
    content: (
      <>
        Build custom commands tailored to your own community flows, inside jokes, and support routines. That makes Waver
        adaptable instead of forcing every server into the same setup.
      </>
    ),
  },
];

export { alertsAccordionItems, commandsAccordionItems, musicAccordionItems };
