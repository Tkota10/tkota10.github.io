#!/usr/bin/env node
// Regenerates Photos/manifest.json from the image files in Photos/.
// Run after adding or removing photos:  node scripts/generate-photos-manifest.js
// (A GitHub Action also runs this automatically when Photos/ changes.)

const fs = require("fs");
const path = require("path");

const PHOTOS_DIR = path.join(__dirname, "..", "Photos");
const MANIFEST = path.join(PHOTOS_DIR, "manifest.json");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"]);

const files = fs
  .readdirSync(PHOTOS_DIR)
  .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

fs.writeFileSync(MANIFEST, JSON.stringify(files, null, 2) + "\n");
console.log(`Wrote ${files.length} photo(s) to Photos/manifest.json`);
