import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Mulish } from 'next/font/google';
import type { Metadata } from 'next';

const mulish = Mulish({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Waver Docs',
    template: '%s | Waver Docs',
  },
  description:
    'The official documentation for Waver, a high-quality Discord music bot. Learn about commands, setup, and features.',
  metadataBase: new URL('https://docs.waverbot.com'),
  openGraph: {
    title: 'Waver Docs',
    description: 'The official documentation for Waver, a high-quality Discord music bot.',
    url: 'https://docs.waverbot.com',
    siteName: 'Waver Docs',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={mulish.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'dark', forcedTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
