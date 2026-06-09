/**
 * One-time asset pipeline: crop Downloads/assets → optimized WebP in public/
 * Uses: team photo + 4-panel UI collage (rejects handshake + hologram assets)
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.resolve(process.env.HOME ?? "", "Downloads/assets");
const OUT = path.join(ROOT, "public/images/services");

const TEAM_SRC = path.join(
  ASSETS,
  "ChatGPT Image Jun 8, 2026, 07_17_57 PM.png",
);
const COLLAGE_SRC = path.join(
  ASSETS,
  "ChatGPT Image Jun 8, 2026, 07_13_28 PM.png",
);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exportWebp(buffer, outPath, width, height, quality = 82) {
  await sharp(buffer)
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  const stat = await fs.stat(outPath);
  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${Math.round(stat.size / 1024)}KB)`);
}

async function cropCollagePanel(index, outPath, width, height) {
  const meta = await sharp(COLLAGE_SRC).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const panelW = Math.floor(w / 4);
  const left = panelW * index;
  const buffer = await sharp(COLLAGE_SRC)
    .extract({ left, top: 0, width: panelW, height: h })
    .toBuffer();
  await exportWebp(buffer, outPath, width, height);
}

async function main() {
  console.log("Optimizing service page images…\n");

  for (const slug of [
    "product-engineering",
    "consulting",
    "qa-it",
    "ai-data",
  ]) {
    await ensureDir(path.join(OUT, slug));
  }

  // Product engineering: team at work
  const teamMeta = await sharp(TEAM_SRC).metadata();
  const tw = teamMeta.width ?? 0;
  const th = teamMeta.height ?? 0;

  // Hero 5:4 — crop right 70% where team/desks are
  const heroLeft = Math.floor(tw * 0.28);
  const heroBuffer = await sharp(TEAM_SRC)
    .extract({
      left: heroLeft,
      top: 0,
      width: tw - heroLeft,
      height: th,
    })
    .toBuffer();
  await exportWebp(
    heroBuffer,
    path.join(OUT, "product-engineering/hero.webp"),
    1600,
    1280,
  );

  // Process sticky 3:4 — center-right crop
  const procLeft = Math.floor(tw * 0.22);
  const procBuffer = await sharp(TEAM_SRC)
    .extract({
      left: procLeft,
      top: 0,
      width: tw - procLeft,
      height: th,
    })
    .toBuffer();
  await exportWebp(
    procBuffer,
    path.join(OUT, "product-engineering/process.webp"),
    1200,
    1600,
  );

  // Collage panels: 0=ecommerce (skip), 1=analytics, 2=devops, 3=ai
  await cropCollagePanel(
    1,
    path.join(OUT, "consulting/process.webp"),
    1920,
    1080,
  );
  await cropCollagePanel(2, path.join(OUT, "qa-it/process.webp"), 1920, 1080);
  await cropCollagePanel(3, path.join(OUT, "ai-data/process.webp"), 1920, 1080);

  console.log("\nSkipped (not trustworthy): handshake + hologram PNGs");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
