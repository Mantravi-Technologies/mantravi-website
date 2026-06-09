/**
 * Seeds SEO/GEO blog posts from sanity/blog-seeds/*.json into Sanity.
 * Usage: npm run seed:blogs
 */
import { createClient } from "@sanity/client";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildPortableText } from "../sanity/blog-seeds/build-portable-text.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const seedsDir = join(root, "sanity", "blog-seeds");

function loadEnvLocal() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) {
    console.error(`No .env.local found at ${envPath}`);
    return;
  }
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function upsertBySlug(type, slug, doc) {
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug },
  );
  if (existing) {
    await client.patch(existing).set(doc).commit();
    return existing;
  }
  const created = await client.create({
    _type: type,
    slug: { _type: "slug", current: slug },
    ...doc,
  });
  return created._id;
}

async function getCategoryIds() {
  const cats = await client.fetch(
    `*[_type == "category"]{ "slug": slug.current, _id }`,
  );
  const map = {};
  for (const c of cats) map[c.slug] = c._id;
  return map;
}

async function getAuthorId() {
  const existing = await client.fetch(`*[_type == "author"][0]._id`);
  if (existing) return existing;
  const created = await client.create({
    _type: "author",
    name: "Mantravi Team",
    role: "Engineering",
    bio: "Insights from the Mantravi engineering team.",
  });
  return created._id;
}

async function main() {
  console.log(`Seeding blog posts to ${projectId}/${dataset}...`);

  const authorId = await getAuthorId();
  const categoryIds = await getCategoryIds();

  const jsonFiles = readdirSync(seedsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (!jsonFiles.length) {
    console.error("No JSON seed files found in sanity/blog-seeds/");
    process.exit(1);
  }

  for (const file of jsonFiles) {
    const raw = JSON.parse(readFileSync(join(seedsDir, file), "utf8"));
    const { slug, categorySlug, sections, ...meta } = raw;

    if (!slug || !categorySlug) {
      console.warn(`Skipping ${file}: missing slug or categorySlug`);
      continue;
    }

    const categoryId = categoryIds[categorySlug];
    if (!categoryId) {
      console.warn(`Skipping ${slug}: unknown category ${categorySlug}`);
      continue;
    }

    const body = sections ? buildPortableText(sections) : [];

    const doc = {
      ...meta,
      author: { _type: "reference", _ref: authorId },
      categories: [{ _type: "reference", _ref: categoryId }],
      body,
      status: meta.status ?? "published",
    };

    const id = await upsertBySlug("blogPost", slug, doc);
    console.log(`Blog post: ${slug} → ${id}`);
  }

  console.log("Blog seed complete.");
}

main().catch((err) => {
  if (err?.statusCode === 401) {
    console.error("\n401 Unauthorized — check SANITY_API_TOKEN in .env.local");
  } else {
    console.error(err);
  }
  process.exit(1);
});
