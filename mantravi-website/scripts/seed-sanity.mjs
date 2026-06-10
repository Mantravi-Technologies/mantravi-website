/**
 * Seeds Sanity production dataset from sanity/seed-data.json plus categories/authors.
 * Usage: npm run seed:sanity
 */
import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

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
  console.error(
    "Create a Developer token at https://sanity.io/manage/project/s5smijy4/api",
  );
  process.exit(1);
}

if (!token.startsWith("sk")) {
  console.error("SANITY_API_TOKEN should start with sk — check .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const blogCategories = [
  { title: "Web & App Development", slug: "web-development" },
  { title: "Digital Marketing & SEO", slug: "digital-marketing" },
  { title: "QA & IT Solutions", slug: "qa-it" },
  { title: "AI Insights", slug: "ai-insights" },
];

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

async function upsertAuthor() {
  const id = "author-mantravi-team";
  await client.createOrReplace({
    _id: id,
    _type: "author",
    name: "Mantravi Team",
    role: "Engineering",
    bio: "Insights from the Mantravi engineering team.",
  });
  return id;
}

async function main() {
  console.log(`Seeding ${projectId}/${dataset}...`);

  const authorId = await upsertAuthor();
  console.log("Author:", authorId);

  const categoryIds = {};
  for (const cat of blogCategories) {
    const id = await upsertBySlug("category", cat.slug, { title: cat.title });
    categoryIds[cat.slug] = id;
    console.log("Category:", cat.slug, id);
  }

  const seedPath = join(root, "sanity", "seed-data.json");
  const seedDocs = JSON.parse(readFileSync(seedPath, "utf8"));

  for (const raw of seedDocs) {
    const { _type, slug, ...rest } = raw;
    const slugCurrent = slug?.current;
    if (!slugCurrent && _type !== "siteSettings") continue;

    if (_type === "siteSettings") {
      const existing = await client.fetch(`*[_type == "siteSettings"][0]._id`);
      if (existing) {
        await client.patch(existing).set(rest).commit();
        console.log("Updated siteSettings");
      } else {
        await client.create({ _type, ...rest });
        console.log("Created siteSettings");
      }
      continue;
    }

    if (_type === "blogPost") {
      const doc = {
        ...rest,
        author: { _type: "reference", _ref: authorId },
        categories: [
          { _type: "reference", _ref: categoryIds["web-development"] },
        ],
      };
      const id = await upsertBySlug(_type, slugCurrent, doc);
      console.log("Blog post:", slugCurrent, id);
      continue;
    }

    if (_type === "caseStudy") {
      const bodyFiles = {
        vedlik: "vedlik-body.json",
        plantropan: "plantropan-body.json",
        "dp-jewellers": "dp-jewellers-body.json",
      };
      const bodyFile = bodyFiles[slugCurrent];
      if (bodyFile) {
        const bodyPath = join(root, "sanity", bodyFile);
        if (existsSync(bodyPath)) {
          rest.body = JSON.parse(readFileSync(bodyPath, "utf8"));
        }
      }
      const id = await upsertBySlug(_type, slugCurrent, rest);
      console.log("Case study:", slugCurrent, id);
    }
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  if (err?.statusCode === 401) {
    console.error(
      "\n401 Unauthorized — your API token is invalid or was revoked.",
    );
    console.error(
      "Create a new Developer token at https://sanity.io/manage/project/s5smijy4/api",
    );
    console.error(
      "Paste it into .env.local as SANITY_API_TOKEN=sk... (no quotes, single line)",
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
