import type { Metadata, Viewport } from 'next';
import { Cinzel, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hermetic Qabalah Tree of Life',
  description:
    'Interactive study guide and visualizer for the Qabalistic Tree of Life, featuring Sephira, Paths, Pillars, Golden Dawn attributions, and AI pathworking guidance.',
  openGraph: {
    title: 'Hermetic Qabalah Tree of Life',
    description:
      'Interactive study guide and visualizer for the Qabalistic Tree of Life, featuring Sephira, Paths, Pillars, Golden Dawn attributions, and AI pathworking guidance.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#050507',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[#050507] text-[#e0e0e0] overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
