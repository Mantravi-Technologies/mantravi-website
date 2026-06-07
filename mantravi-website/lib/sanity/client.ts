import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(
  projectId && projectId !== "your_project_id"
);

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  return createClient({
    projectId: projectId!,
    dataset,
    apiVersion,
    useCdn: true,
  });
}

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
