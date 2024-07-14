import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import React from "react";

interface EmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarSrc?: string;
  username?: string;
  isBot?: boolean;
  message?: React.ReactNode;
}

export function Embed({
  children,
  username,
  avatarSrc,
  message,
  isBot,
}: EmbedProps) {
  return (
    <div className="flex gap-5 leading-tight">
      <Avatar
        ImgComponent={Image}
        imgProps={{ width: 40, height: 40 }}
        src={avatarSrc}
        className="min-w-10 min-h-10"
      />

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center ">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold transition hover:underline hover:text-zinc-400 cursor-pointer leading-tight">
              {username}
            </p>

            {isBot && (
              <p className="font-bold bg-blue-600 px-[5px] text-xs uppercase rounded leading-tight">
                App
              </p>
            )}
          </div>

          <time
            suppressHydrationWarning
            className="text-xs text-zinc-400 leading-tight"
          >
            {new Date(Date.now()).toLocaleString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",

              hour: "numeric",
              minute: "numeric",
            })}
          </time>
        </div>

        {message && <div>{message}</div>}

        {children && (
          <div className="flex flex-col gap-2 bg-zinc-900 p-4 pl-3.5 rounded border-l-[5px] border-lime-500 text-sm">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
