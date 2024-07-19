import NextLink from "next/link";
import { Button } from "../components/UI/Button";
import { Navbar } from "../components/Navbar";

export default function Custom404() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <Navbar />

        <h1 className="text-6xl font-black leading-tight">
          404 - Page not found
        </h1>

        <Button
          as={NextLink}
          href="/"
          className="rounded-full bg-lime-400 text-black font-semibold w-min px-5"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
