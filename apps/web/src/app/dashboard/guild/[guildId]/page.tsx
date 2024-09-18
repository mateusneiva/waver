"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextLink from "next/link";

import { Skeleton } from "@nextui-org/react";

import { Navbar } from "../../../../components/Navbar";
import { UserCard } from "../../../../components/UserCard";
import { IGuild } from "../../../../components/GuildsList";

import { api } from "../../../../services/API";
import BackIcon from "../../../../assets/icons/BackIcon";

interface IGuildConfig {
  prefix: string;
  welcomeChannel: string;
}

export default function Guild() {
  const [guild, setGuild] = useState<IGuild>();
  const [guildConfig, setConfigGuild] = useState<IGuildConfig>();
  const [loading, setLoading] = useState(true);

  const { guildId } = useParams();

  useEffect(() => {
    setLoading(true);

    api.get(`/guilds/config/${guildId}/`).then(({ data }) => {
      setConfigGuild(data);
    });

    api
      .get(`/discord/guild/${guildId}`)
      .then(({ data }) => {
        setGuild({ ...data, ownerId: data.owner_id });
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <div className="flex flex-col w-[1200px]">
        <div className="flex justify-between items-center w-full mt-6 pb-3">
          <div className="flex gap-2.5 items-center">
            <NextLink
              href="/dashboard"
              className="bg-zinc-900 mr-3 p-2.5 rounded-full"
            >
              <BackIcon />
            </NextLink>

            {loading && (
              <>
                <Skeleton className="w-8 h-8 object-cover rounded-lg" />
                <Skeleton className="font-bold rounded-lg w-28 h-5"></Skeleton>
              </>
            )}

            {!loading && (
              <>
                <img
                  className="w-8 h-8 object-cover rounded-lg"
                  src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
                />
                <h2 className="font-bold text-2xl">{guild?.name}</h2>
              </>
            )}
          </div>

          <UserCard />
        </div>

        <div className="flex w-full h-[500px] gap-6">
          <div className="w-1/4">
            <a className="flex rounded-lg font-semibold w-full bg-zinc-900 hover:bg-zinc-800 transition px-6 py-2">
              General Information
            </a>

            <a className="flex rounded-lg font-semibold w-full bg-zinc-950 hover:bg-zinc-800 transition px-6 py-2">
              Alerts
            </a>

            <a className="flex rounded-lg font-semibold w-full bg-zinc-950 hover:bg-zinc-800 transition px-6 py-2">
              Logs
            </a>
          </div>

          <div className="w-3/4 flex flex-col">
            <div>
              <div className="bg-zinc-900 rounded-xl p-5">
                <h2 className="font-bold text-xl mb-2">General Information</h2>
                <p className="font-semibold text-sm">Name</p>
                <p className="text-sm text-zinc-300 pb-4">{guild?.name}</p>

                <p className="font-semibold text-sm">GuildId</p>
                <p className="text-sm text-zinc-300 pb-4">{guild?.id}</p>

                <p className="font-semibold text-sm">OwnerId</p>
                <p className="text-sm text-zinc-300 pb-4">{guild?.ownerId}</p>

                <p className="font-semibold text-sm">Prefix</p>
                <p className="text-sm text-zinc-300 pb-4">
                  {guildConfig?.prefix}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
