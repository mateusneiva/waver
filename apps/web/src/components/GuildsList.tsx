"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { api } from "../services/API";

interface IGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export function GuildsList() {
  const [guilds, setGuilds] = useState<IGuild[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/discord/guilds/")
      .then(({ data }) => {
        setGuilds(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-zinc-900 bg-opacity-50 border border-zinc-800 rounded-xl w-full">
      <div className="flex flex-col">
        <div className="border-b border-zinc-800 px-5 py-2.5">
          <p className="text-zinc-400 text-sm font-medium">Server</p>
        </div>

        {loading && (
          <>
            <div className="border-b border-zinc-800 last:border-none p-1">
              <div className="flex items-center gap-3 w-full h-full rounded-lg px-3.5 py-3 hover:bg-zinc-800 hover:bg-opacity-50">
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8" />
                </Skeleton>

                <Skeleton className="rounded-lg">
                  <div className="w-52 h-4" />
                </Skeleton>
              </div>
            </div>

            <div className="border-b border-zinc-800 last:border-none p-1">
              <div className="flex items-center gap-3 w-full h-full rounded-lg px-3.5 py-3 hover:bg-zinc-800 hover:bg-opacity-50">
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8" />
                </Skeleton>

                <Skeleton className="rounded-lg">
                  <div className="w-52 h-4" />
                </Skeleton>
              </div>
            </div>

            <div className="border-b border-zinc-800 last:border-none p-1">
              <div className="flex items-center gap-3 w-full h-full rounded-lg px-3.5 py-3 hover:bg-zinc-800 hover:bg-opacity-50">
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8" />
                </Skeleton>

                <Skeleton className="rounded-lg">
                  <div className="w-52 h-4" />
                </Skeleton>
              </div>
            </div>

            <div className="border-b border-zinc-800 last:border-none p-1">
              <div className="flex items-center gap-3 w-full h-full rounded-lg px-3.5 py-3 hover:bg-zinc-800 hover:bg-opacity-50">
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8" />
                </Skeleton>

                <Skeleton className="rounded-lg">
                  <div className="w-52 h-4" />
                </Skeleton>
              </div>
            </div>
          </>
        )}

        {guilds?.map((guild) => {
          return (
            <NextLink
              href={`/dashboard/servers/${guild.id}`}
              className="flex items-center gap-4 border-b border-zinc-800 last:border-none p-1"
            >
              <div className="flex items-center gap-3 w-full h-full rounded-lg px-3.5 py-3 hover:bg-zinc-800 hover:bg-opacity-50">
                <img
                  className="w-8 h-8 object-cover rounded-lg"
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                />

                <p className="text-zinc-200 font-semibold text-sm">
                  {guild.name}
                </p>
              </div>
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
