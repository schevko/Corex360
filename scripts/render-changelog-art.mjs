// Generates the Changelog hero artwork as transparent WebP from pure-vector SVG
// — a "release graph": a timeline rail with version nodes, each connected to a
// release card holding a version chip + tagged change bars (echoes the page).
// Warm-ivory MONOCHROME; a light + a dark variant (theme-swapped, like the logo).
// Run: node scripts/render-changelog-art.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "team");

const LIGHT = {
  line: "#1c1a15",
  card: "#fbfaf5",
  card2: "#efece3",
  border: "#d8d2c4",
  borderStrong: "#cdc6b6",
  accent: "#1c1a15",
  glow: "#fffdf8",
};
const DARK = {
  line: "#f2efe8",
  card: "#211d16",
  card2: "#2a261c",
  border: "#443d30",
  borderStrong: "#4f4838",
  accent: "#f2efe8",
  glow: "#322d24",
};

function art(C) {
  const w = 1100,
    h = 1000;
  const railX = 150;
  const cardX = 222;
  const cardW = 820;
  const cys = [200, 500, 800]; // three release rows, newest first

  // soft glow behind the composition
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="glow" cx="42%" cy="32%" r="65%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <line x1="${railX}" y1="96" x2="${railX}" y2="904" stroke="${C.borderStrong}" stroke-width="2" opacity="0.6"/>
  <path d="M ${railX} 300 C ${railX - 46} 380 ${railX - 46} 470 ${railX} 548" fill="none" stroke="${C.borderStrong}" stroke-width="1.6" opacity="0.4"/>`;

  cys.forEach((cy, i) => {
    const newest = i === 0;
    const cardY = cy - 108;
    // node + connector
    s += `
  <line x1="${railX}" y1="${cy}" x2="${cardX}" y2="${cy}" stroke="${C.borderStrong}" stroke-width="1.6" opacity="0.5"/>
  <circle cx="${railX}" cy="${cy}" r="26" fill="url(#halo)"/>
  <circle cx="${railX}" cy="${cy}" r="13" fill="none" stroke="${C.borderStrong}" stroke-width="2"/>
  <circle cx="${railX}" cy="${cy}" r="6.5" fill="${C.accent}"/>`;
    // card
    s += `
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="216" rx="22" fill="${C.card}" fill-opacity="${newest ? 0.92 : 0.72}" stroke="${newest ? C.borderStrong : C.border}" stroke-width="${newest ? 1.6 : 1.2}"/>`;
    // version chip + (newest) live dot
    s += `
  <rect x="${cardX + 30}" y="${cardY + 28}" width="86" height="26" rx="13" fill="${C.accent}"/>`;
    if (newest) {
      s += `<circle cx="${cardX + 140}" cy="${cardY + 41}" r="5" fill="${C.accent}"/>`;
    }
    // three tagged change rows
    const rows = [
      { tag: "new", barW: 600, op: 0.16 },
      { tag: "improved", barW: 510, op: 0.12 },
      { tag: "fixed", barW: 420, op: 0.1 },
    ];
    rows.forEach((r, ri) => {
      const ry = cardY + 80 + ri * 42;
      const tx = cardX + 30;
      // tag square — filled / outlined / muted (echoes the severity pills)
      if (r.tag === "new") {
        s += `<rect x="${tx}" y="${ry}" width="16" height="16" rx="5" fill="${C.accent}"/>`;
      } else if (r.tag === "improved") {
        s += `<rect x="${tx}" y="${ry}" width="16" height="16" rx="5" fill="none" stroke="${C.borderStrong}" stroke-width="2"/>`;
      } else {
        s += `<rect x="${tx}" y="${ry}" width="16" height="16" rx="5" fill="${C.card2}" stroke="${C.border}" stroke-width="1.2"/>`;
      }
      // change bar
      s += `<rect x="${tx + 30}" y="${ry + 1}" width="${r.barW}" height="14" rx="7" fill="${C.line}" fill-opacity="${r.op}"/>`;
    });
  });

  s += `\n</svg>`;
  return s;
}

async function render(name, svg) {
  const info = await sharp(Buffer.from(svg), { density: 144 })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(join(OUT, name));
  console.log(`✓ ${name}  ${(info.size / 1024).toFixed(1)} KB  ${info.width}×${info.height}`);
}

await render("changelog-art-light.webp", art(LIGHT));
await render("changelog-art-dark.webp", art(DARK));
console.log("done.");
