import { Metadata } from "next";
import { Mulish, Lexend_Deca } from "next/font/google";

import { Providers } from "./providers";
import "../styles/main.css";

export const metadata: Metadata = {
  title: "Waver",
};

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend_deca",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark bg-zinc-950 font-mulish ${mulish.variable} ${lexendDeca.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
