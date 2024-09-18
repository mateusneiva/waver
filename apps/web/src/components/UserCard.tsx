"use client";

import { Avatar } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";

export function UserCard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {user && (
        <div className="flex justify-center">
          <div className="flex items-center gap-3 w-full p-2 pl-3 pr-12 border border-zinc-900 rounded-xl transition hover:bg-zinc-900 hover:bg-opacity-80">
            <Avatar
              size="sm"
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            />

            <div className="leading-tight">
              <h3 className="font-bold">{user.displayName}</h3>
              <h3 className="text-zinc-400 text-sm">{user.username}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
