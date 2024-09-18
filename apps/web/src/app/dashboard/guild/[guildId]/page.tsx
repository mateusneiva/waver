"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextLink from "next/link";

import { api } from "../../../../services/API";

import { Navbar } from "../../../../components/Navbar";
import { UserCard } from "../../../../components/UserCard";
import { IGuild } from "../../../../components/GuildsList";
import { Skeleton } from "@nextui-org/react";
import BackIcon from "../../../../assets/icons/BackIcon";

interface IGuildConfig {}

export default function Guild() {
  const [guild, setGuild] = useState<IGuild>();
  const [guildConfig, setConfigGuild] = useState();
  const [loading, setLoading] = useState(true);

  const { guildId } = useParams();

  useEffect(() => {
    setLoading(true);

    api.get(`/guilds/${guildId}/config`).then(({ data }) => {
      setConfigGuild(data);
      console.log(data);
    });

    api
      .get(`/discord/guild/${guildId}`)
      .then(({ data }) => {
        setGuild(data);
        console.log(data);
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
      </div>
    </div>
  );
}
