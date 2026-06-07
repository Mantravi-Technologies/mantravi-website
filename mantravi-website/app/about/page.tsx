import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mantravi, a digital engineering powerhouse trusted by enterprises worldwide.",
};
export default function AboutPage() {
  return <AboutContent />;
}
