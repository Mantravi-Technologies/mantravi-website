import { unstable_cache } from "next/cache";

export const SANITY_BLOG_TAG = "sanity:blog";
export const SANITY_CASE_STUDY_TAG = "sanity:case-study";

const REVALIDATE_SECONDS = 60;

export async function withSanityCache<T>(
  key: string[],
  tags: string[],
  fn: () => Promise<T>,
): Promise<T> {
  if (process.env.NODE_ENV === "development") {
    return fn();
  }

  return unstable_cache(fn, key, {
    tags,
    revalidate: REVALIDATE_SECONDS,
  })();
}
