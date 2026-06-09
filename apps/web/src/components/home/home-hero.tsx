import Image from "next/image";

import { Section } from "../section";
import { Button } from "../ui/button";

type HomeHeroProps = {
  imageAlt: string;
  imageSrc: string;
};

export function HomeHero({ imageAlt, imageSrc }: HomeHeroProps) {
  return (
    <div className="flex justify-center items-center w-full min-h-[600px] bg-memphisPattern">
      <div className="flex justify-center items-center w-full min-h-[600px] bg-gradient-to-r from-transparent via-zinc-950 to-transparent">
        <Section delay={0}>
          <div className="flex flex-col justify-center items-center text-center w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={120}
              height={120}
              loading="eager"
              className="rounded-full object-cover border-4 border-lime-400 shadow-[0px_0px_30px_-1px_#a3e635]"
            />
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-4">Waver is a multi-purpose bot</h1>

            <p className="pt-5 text-zinc-400 font-base text-lg w-full max-w-[650px]">
              Waver is an versatile bot designed to play music and offer a range of other functionalities, providing
              users with a seamless and enjoyable experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-7 w-full sm:w-auto px-4 sm:px-0">
              <Button
                color="primary"
                target="_blank"
                href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&permissions=8&integration_type=0&scope=bot"
              >
                Invite to server
              </Button>

              <Button color="secondary" target="_blank" href="https://docs.waverbot.com">
                Documentation
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
