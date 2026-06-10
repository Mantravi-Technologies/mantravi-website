import type { Metadata } from "next";
import { siteConfig } from "@/lib/content/site-data";

const DEFAULT_OG = "/apple-icon.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Metadata {
  const url = path.startsWith("http") ? path : `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}${DEFAULT_OG}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(type === "article" && authors?.length
      ? { authors: authors.map((name) => ({ name })) }
      : {}),
  };
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
