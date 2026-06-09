import { Link } from "@heroui/react";

import Logo from "../assets/logo";

export function Footer() {
  return (
    <div className="flex justify-center pt-10 pb-10 text-sm border-t border-zinc-900 w-full">
      <div className="w-full max-w-[1200px] px-4 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between w-full gap-8">
          <Logo />

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-32">
            <ul className="flex flex-col gap-4 font-medium">
              <li>Waver</li>

              <li>
                <Link href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&permissions=8&integration_type=0&scope=bot" target="_blank" className="text-lime-400 hover:underline hover:text-lime-300 text-sm">Invite</Link>
              </li>

              <li>
                <Link href="https://docs.waverbot.com/commands" target="_blank" className="text-lime-400 hover:underline hover:text-lime-300 text-sm">Commands</Link>
              </li>

              <li>
                <Link href="https://waver.statuspage.io" target="_blank" className="text-lime-400 hover:underline hover:text-lime-300 text-sm">Status</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-4 font-medium text-sm">
              <li>Social</li>
              <li>
                <Link href="https://github.com/mateusneiva/waver" target="_blank" className="text-lime-400 hover:underline hover:text-lime-300 text-sm">Github</Link>
              </li>
              <li>
                <Link href="https://buymeacoffee.com/mateus.fneiva" target="_blank" className="text-lime-400 hover:underline hover:text-lime-300 text-sm">Buy me a coffee</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-zinc-900 pt-8 mt-20">
          <p>© {new Date().getFullYear()} Mateus Neiva</p>
        </div>
      </div>
    </div>
  );
}
