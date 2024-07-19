"use client";

import NextLink from "next/link";
import { Avatar } from "@nextui-org/avatar";

import { useAuth } from "../context/AuthContext";
import { Button } from "./UI/Button";
import Logo from "../assets/Logo";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-between top-0 sticky h-screen pt-6 border-r border-zinc-800  min-w-[260px]">
      <div className="flex flex-col gap-4 px-3">
        <Logo />

        <div className="flex flex-col gap-1 w-full pt-3">
          <Button
            as={NextLink}
            href="/dashboard/servers"
            radius="sm"
            variant="light"
            className="hover:bg-zinc-900"
          >
            <div className="w-full">
              <p className="font-semibold">Servers</p>
            </div>
          </Button>

          <Button
            as={NextLink}
            href="/dashboard/account"
            radius="sm"
            variant="light"
            className="hover:bg-zinc-900"
          >
            <div className="w-full">
              <p className="font-semibold">Account Settings</p>
            </div>
          </Button>
        </div>
      </div>

      {user && (
        <div className="flex justify-center items-center p-4 w-full">
          <div className="flex items-center gap-3 w-full p-2 rounded-lg transition hover:bg-zinc-900">
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
