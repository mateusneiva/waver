"use client";

import { Avatar } from "@heroui/react";
import React from "react";
import { useEffect, useState } from "react";

interface EmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarSrc: string;
  username: string;
  isBot?: boolean;
  message?: React.ReactNode;
}

export function Embed({ children, username, avatarSrc, message, isBot }: EmbedProps) {
  const [renderTimestamp, setRenderTimestamp] = useState("");

  useEffect(() => {
    setRenderTimestamp(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  return (
    <div className="flex gap-3 leading-tight min-w-0 w-full">
      <Avatar className="min-w-10 min-h-10 flex-shrink-0">
        <Avatar.Image alt={username} src={avatarSrc} width={40} height={40} />

        <Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold transition hover:underline hover:text-zinc-400 cursor-pointer leading-tight">
              {username}
            </p>

            {isBot && <p className="font-bold bg-blue-600 px-[5px] text-xs uppercase rounded leading-tight">App</p>}
          </div>

          <time suppressHydrationWarning className="text-xs text-zinc-400 leading-tight">
            {renderTimestamp}
          </time>
        </div>

        {message && <div className="min-w-0 overflow-hidden break-all">{message}</div>}

        {children && (
          <div className="flex flex-col gap-2 bg-zinc-900 p-4 pl-3.5 rounded border-l-[5px] border-lime-500 text-sm min-w-0 overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
