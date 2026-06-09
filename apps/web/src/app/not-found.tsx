import type React from "react";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";

export default function Custom404(): React.JSX.Element {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full flex flex-col items-center gap-5">
        <Navbar />

        <div className="h-full flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl sm:text-6xl font-black leading-tight text-center px-4">404 - Page not found</h1>

          <Button href="/" className="rounded-full bg-lime-400 text-black font-semibold w-min px-5">
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
