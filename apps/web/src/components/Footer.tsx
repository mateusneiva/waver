import { Link } from "@nextui-org/link";

import Logo from "../assets/Logo";

export function Footer() {
  return (
    <div className="flex justify-center pt-10 pb-10 text-sm border-t border-zinc-900 w-full">
      <div className="w-[1200px] flex flex-col">
        <div className="flex justify-between w-full">
          <Logo />

          <div className="flex gap-32">
            <ul className="flex flex-col gap-4 font-medium">
              <li>Waver</li>

              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Invite
                </Link>
              </li>

              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Commands
                </Link>
              </li>

              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Support
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-4 font-medium text-sm">
              <li>Social</li>
              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Github
                </Link>
              </li>
              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Twitter
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-4 font-medium">
              <li>Legal</li>
              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-lime-400 hover:underline hover:text-lime-300 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-zinc-900 pt-8 mt-20">
          <p>© 2024 Mateus Neiva</p>
        </div>
      </div>
    </div>
  );
}
