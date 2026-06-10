import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ContactProvider } from "@/components/providers/ContactProvider";
import {
  ContactModal,
  FloatingContactButton,
} from "@/components/forms/ContactModal";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { siteConfig } from "@/lib/content/site-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const script = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  title: {
    default: `${siteConfig.name} | AI-Native Digital Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  ...buildPageMetadata({
    title: `${siteConfig.name} | AI-Native Digital Solutions`,
    description: siteConfig.description,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${script.variable}`}
    >
      <body className="antialiased">
        <SiteJsonLd />
        <ContactProvider>
          <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ContactModal />
            <FloatingContactButton />
          </SmoothScrollProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
