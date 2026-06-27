import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import {
  SANITY_BLOG_TAG,
  SANITY_CASE_STUDY_TAG,
} from "@/lib/sanity/cache";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

function resolveSlug(slug: SanityWebhookBody["slug"]): string | undefined {
  if (!slug) return undefined;
  if (typeof slug === "string") return slug;
  return slug.current;
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: SanityWebhookBody = {};
  try {
    body = (await request.json()) as SanityWebhookBody;
  } catch {
    // Empty body still revalidates blog listing.
  }

  const slug = resolveSlug(body.slug);
  const paths: string[] = [];

  if (body._type === "blogPost" || !body._type) {
    revalidateTag(SANITY_BLOG_TAG);
    revalidatePath("/blog");
    paths.push("/blog");

    if (slug) {
      const postPath = `/blog/${slug}`;
      revalidatePath(postPath);
      paths.push(postPath);
    }

    revalidatePath("/blog/category", "layout");
  }

  if (body._type === "caseStudy") {
    revalidateTag(SANITY_CASE_STUDY_TAG);
    revalidatePath("/portfolio");
    paths.push("/portfolio");

    if (slug) {
      const studyPath = `/portfolio/${slug}`;
      revalidatePath(studyPath);
      paths.push(studyPath);
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    at: new Date().toISOString(),
  });
}
