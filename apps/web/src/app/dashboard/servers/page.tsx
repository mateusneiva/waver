import { GuildsList } from "../../../components/GuildsList";

export default function Servers() {
  return (
    <div className="flex flex-col p-7 w-full">
      <h2 className="font-bold text-2xl mb-5">Servers</h2>

      <GuildsList />
    </div>
  );
}
