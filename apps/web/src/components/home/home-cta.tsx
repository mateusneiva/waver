import { Button } from "../ui/button";

export function HomeCta() {
  return (
    <div className="flex justify-center items-center h-auto min-h-[300px] w-full bg-herringbonePattern border-t border-zinc-900">
      <div className="flex flex-col justify-center items-center w-full min-h-[300px] bg-gradient-to-r from-transparent via-zinc-950 to-transparent px-4 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold leading-tight pb-5">Get started with Waver</h3>

        <Button target="_blank" href="https://discord.com/oauth2/authorize?client_id=1147706930391949352&permissions=8&integration_type=0&scope=bot">
          Invite to server
        </Button>
      </div>
    </div>
  );
}
