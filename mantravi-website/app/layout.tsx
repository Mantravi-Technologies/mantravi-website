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
import { siteConfig } from "@/lib/content/site-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const script = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | AI-Native Digital Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
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
