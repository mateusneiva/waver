"use client";

import { Navbar } from "../../components/Navbar";
import { GuildsList } from "../../components/GuildsList";
import { UserCard } from "../../components/UserCard";

import GridIcon from "../../assets/icons/GridIcon";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <div className="flex flex-col w-[1200px]">
        <div className="flex justify-between items-center w-full mt-6 pb-3">
          <div className="flex gap-2 items-center">
            <GridIcon className="w-7 h-7 p-0.5" />
            <h2 className="font-bold text-2xl">Dashboard</h2>
          </div>

          <UserCard />
        </div>

        <GuildsList />
      </div>
    </div>
  );
}
