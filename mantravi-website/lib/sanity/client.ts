import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(
  projectId && /^[a-z0-9-]+$/.test(projectId),
);

function createSanityClient(useCdn: boolean): SanityClient | null {
  if (!isSanityConfigured) return null;
  return createClient({
    projectId: projectId!,
    dataset,
    apiVersion,
    useCdn,
  });
}

/** Browser-safe client (CDN). Prefer getSanityServerClient in Server Components. */
export function getSanityClient(): SanityClient | null {
  return createSanityClient(true);
}

/** Fresh API reads for build-time and server rendering — avoids stale CDN cache. */
export function getSanityServerClient(): SanityClient | null {
  return createSanityClient(false);
}

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}

export function imageUrlFromSanity(source: unknown): string | undefined {
  if (!source || !builder) return undefined;
  try {
    return builder.image(source as SanityImageSource).width(1600).url();
  } catch {
    return undefined;
  }
}
