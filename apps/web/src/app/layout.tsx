import type { Metadata } from "next";
import { Mulish, Lexend_Deca } from "next/font/google";

import "../styles/main.css";

export const metadata: Metadata = {
  title: {
    default: "Waver",
    template: "%s | Waver",
  },
  description:
    "Waver é um bot de música de alta qualidade e utilidades completo para o seu servidor do Discord. Toque músicas sem lag, gerencie canais e divirta-se com a sua comunidade.",
  keywords: ["discord", "bot", "musica", "waver", "discord bot", "music bot", "qualidade", "sem lag", "utilidades"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://waverbot.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Waver",
    description: "Toque músicas com alta fidelidade e sem lag. Waver é o bot completo que seu servidor precisa.",
    url: "https://waverbot.com",
    siteName: "Waver",
    images: [
      {
        url: "/images/bot_profile.webp",
        width: 512,
        height: 512,
        alt: "Waver Bot Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Waver",
    description: "Toque músicas com alta fidelidade e sem lag. Waver é o bot completo que seu servidor precisa.",
    images: ["/images/bot_profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
}): React.JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark bg-zinc-950 font-mulish ${mulish.variable} ${lexendDeca.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
