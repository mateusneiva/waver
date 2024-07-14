"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import { Button } from "../components/UI/Button";

import Logo from "../assets/Logo";
import GithubIcon from "../assets/icons/GithubIcon";
import MoonIcon from "../assets/icons/MoonIcon";

export function Navbar() {
  return (
    <header className="w-full flex justify-center items-center py-4 sticky top-0 z-40 bg-zinc-950 bg-opacity-95 backdrop-blur-sm border-b border-zinc-900">
      <div className="w-[1200px] flex justify-between items-center">
        <NextLink href="/">
          <Logo />
        </NextLink>

        <nav className="flex items-center gap-6 text-white">
          <Link href="#" target="_blank" className="fill-zinc-300">
            <GithubIcon />
          </Link>

          <Link href="#" className="text-zinc-300">
            <MoonIcon />
          </Link>

          <span className="py-4 border-r border-r-zinc-900" />

          <Link
            as={NextLink}
            href="/status"
            className="text-zinc-300 text-sm font-medium hover:underline"
          >
            Status
          </Link>

          <Link
            as={NextLink}
            href="/commands"
            className="text-zinc-300 text-sm font-medium hover:underline"
          >
            Commands
          </Link>

          <Link
            as={NextLink}
            href="#"
            className="text-zinc-300 text-sm font-medium hover:underline"
          >
            Support
          </Link>

          <Link
            as={NextLink}
            href="#"
            className="text-zinc-300 text-sm font-medium hover:underline"
          >
            Invite
          </Link>

          <Button color="primary" href="/dashboard" as={NextLink}>
            Go to Dashboard
          </Button>
        </nav>
      </div>
    </header>
  );
}
