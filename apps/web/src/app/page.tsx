import type React from "react";
import { Footer } from "../components/footer";
import { HomeCta } from "../components/home/home-cta";
import { HomeHero } from "../components/home/home-hero";
import { HomeSections } from "../components/home/home-sections";
import { Navbar } from "../components/navbar";
import { Slider } from "../components/slider";

export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <HomeHero imageSrc="/images/bot_profile.webp" imageAlt="Bot image" />
      <Slider />
      <HomeSections />
      <HomeCta />
      <Footer />
    </div>
  );
}
