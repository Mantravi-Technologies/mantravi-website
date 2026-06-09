import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Mantravi is an AI-native digital product studio. Senior engineers and architects building fast, resilient web apps, mobile products, marketing systems, and QA pipelines with production-grade practices.",
  path: "/about",
});
export default function AboutPage() {
  return <AboutContent />;
}
