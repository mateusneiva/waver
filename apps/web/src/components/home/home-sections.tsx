import { AlertEmbed, CommandMessageEmbed, NowPlayingEmbed, PlaylistAddedEmbed } from "./home-embeds";
import { alertsAccordionItems, commandsAccordionItems, musicAccordionItems } from "./home-content";
import { HomeFeatureSection } from "./home-feature-section";

export function HomeSections() {
  return (
    <div className="w-full flex flex-col items-center pb-12 md:pb-28 gap-16 md:gap-32">
      <HomeFeatureSection
        delay={0.1}
        title="Music Player"
        items={musicAccordionItems}
        backgroundClassName="w-full flex justify-center bg-visiwigDots py-20"
      >
        <CommandMessageEmbed avatarSrc="https://cdn.discordapp.com/avatars/707634219387715706/946f7490609a455f9eccaa5d2f8dd605.webp?size=1024" />
        <PlaylistAddedEmbed />
        <NowPlayingEmbed />
      </HomeFeatureSection>

      <HomeFeatureSection delay={0.2} title="Alerts" items={alertsAccordionItems}>
        <AlertEmbed
          imageSrc="/images/embeds/guizado_gamer.webp"
          imageAlt="Guizado_Gamer Picture"
          streamName="Guizado_Gamer - Twitch"
          description="E SE EU TE DISSER QUE EU NÃO SEI OQUE ESCREVER, OQUE VOCÊ ME DIRIA?"
        />
        <AlertEmbed
          imageSrc="/images/embeds/luscamasfei.webp"
          imageAlt="luscamasfei Picture"
          streamName="luscamasfei - Twitch"
          description="voltei a jogar e olha no que deu. !discord !coach !webcam !pix"
        />
      </HomeFeatureSection>

      <HomeFeatureSection delay={0.3} title="Commands" items={commandsAccordionItems}>
        <CommandMessageEmbed avatarSrc="https://cdn.discordapp.com/avatars/707634219387715706/946f7490609a455f9eccaa5d2f8dd605.webp?size=1024" />
        <PlaylistAddedEmbed />
        <NowPlayingEmbed />
      </HomeFeatureSection>
    </div>
  );
}
