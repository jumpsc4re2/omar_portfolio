import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { DevGreeting } from "@/components/ui/DevGreeting";
import { InlineScript } from "@/components/ui/InlineScript";
import { siteConfig } from "@/config/site";
import { themeColorsCss, themeInitScript } from "@/lib/theme";
import "./globals.css";

// Display face, only ever used at weight 800, so a single static weight keeps the preload small.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Instrument Serif and Geist Mono are not preloaded so they don't compete with the hero.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.dark.background,
  colorScheme: "dark",
};

/** Without JS, show everything that would otherwise wait for a scroll reveal, and load the serif font. */
const noScriptStyles =
  "[data-reveal],[data-reveal-words] .reveal-word{opacity:1!important;transform:none!important}" +
  "[data-defer-font] .font-serif{font-family:var(--font-serif)!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fontVariables = [bricolage, geist, instrumentSerif, geistMono].map((font) => font.variable).join(" ");

  return (
    <html lang="en" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={themeInitScript} />
        <style dangerouslySetInnerHTML={{ __html: themeColorsCss }} />
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <DevGreeting />
      </body>
    </html>
  );
}
