import NextLink from "next/link";
import { Link } from "@heroui/react";

import Logo from "../assets/logo";
import GithubIcon from "../assets/icons/github-icon";

export function Navbar() {
  return (
    <header className="w-full flex justify-center items-center py-4 sticky top-0 z-40 bg-zinc-950 bg-opacity-95 backdrop-blur-sm border-b border-zinc-900">
      <div className="w-full max-w-[1200px] px-4 flex justify-between items-center">
        <NextLink href="/">
          <Logo />
        </NextLink>

        <nav className="flex items-center gap-6 text-white">
          <Link href="https://github.com/mateusneiva/waver" target="_blank" className="fill-zinc-300">
            <GithubIcon />
          </Link>

          <span className="py-4 border-r border-r-zinc-900" />

          <Link href="https://docs.waverbot.com" target="_blank" className="text-zinc-300 text-sm font-medium hover:underline">
            Documentation
          </Link>

          <Link href="https://waver.statuspage.io" target="_blank" className="text-zinc-300 text-sm font-medium hover:underline">
            Status
          </Link>

          <Link href="https://buymeacoffee.com/mateus.fneiva" target="_blank" className="text-zinc-300 text-sm font-medium hover:underline">
            Buy me a coffee
          </Link>

          <Link target="_blank" href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&permissions=8&integration_type=0&scope=bot" className="text-zinc-300 text-sm font-medium hover:underline">
            Invite
          </Link>
        </nav>
      </div>
    </header>
  );
}
