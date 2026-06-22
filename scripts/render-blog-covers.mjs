// Generates per-post blog cover art as WebP from pure-vector SVG — one motif per
// topic, warm-ivory MONOCHROME, light + dark variant each (theme-swapped).
// Output: public/team/blog/<slug>-{light,dark}.webp
// Run: node scripts/render-blog-covers.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "team", "blog");
mkdirSync(OUT, { recursive: true });

const LIGHT = {
  base1: "#f6f4ef", base2: "#eae5db", line: "#1c1a15", accent: "#1c1a15",
  onAccent: "#fbfaf5", glow: "#fffdf8", border: "#d8d2c4", borderStrong: "#cdc6b6",
  card: "#fbfaf5", card2: "#efece3", orbHi: "#fffefb", orbMid: "#e7e1d4", orbLo: "#c2bba9",
};
const DARK = {
  base1: "#1f1b14", base2: "#14110a", line: "#f2efe8", accent: "#f2efe8",
  onAccent: "#14120e", glow: "#37312654", border: "#3a3327", borderStrong: "#4a4334",
  card: "#252016", card2: "#2c2719", orbHi: "#4f4838", orbMid: "#332e23", orbLo: "#201c14",
};

const W = 1200, H = 750, CX = 600, CY = 375;
const r2 = (n) => Math.round(n * 100) / 100;

function grid(C, step = 60, op = 0.05) {
  let l = "";
  for (let x = step; x < W; x += step) l += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  for (let y = step; y < H; y += step) l += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  return `<g mask="url(#fade)" stroke="${C.line}" stroke-width="1" opacity="${op}">${l}</g>`;
}

// ── Motifs ──
function orbit(C) {
  const rings = [{ rx: 118, o: 0.5 }, { rx: 198, o: 0.38 }, { rx: 286, o: 0.28 }];
  const nodes = [{ rx: 198, deg: 38 }, { rx: 286, deg: 162 }, { rx: 118, deg: 295 }];
  const ringEls = rings
    .map((r) => `<ellipse cx="${CX}" cy="${CY}" rx="${r.rx}" ry="${r2(r.rx * 0.8)}" fill="none" stroke="${C.borderStrong}" stroke-width="1.6" opacity="${r.o}"/>`)
    .join("");
  const nodeEls = nodes
    .map(({ rx, deg }) => {
      const t = (deg * Math.PI) / 180;
      const x = r2(CX + rx * Math.cos(t)), y = r2(CY + rx * 0.8 * Math.sin(t));
      return `<circle cx="${x}" cy="${y}" r="22" fill="url(#halo)"/><circle cx="${x}" cy="${y}" r="7" fill="${C.accent}"/>`;
    })
    .join("");
  return `<g transform="rotate(-12 ${CX} ${CY})">${ringEls}${nodeEls}</g>
    <circle cx="${CX}" cy="${CY}" r="96" fill="url(#orbGlow)"/>
    <circle cx="${CX}" cy="${CY}" r="48" fill="url(#orb)"/>
    <circle cx="${CX}" cy="${CY}" r="48" fill="none" stroke="${C.borderStrong}" stroke-width="1" opacity="0.6"/>
    <ellipse cx="${CX - 15}" cy="${CY - 17}" rx="16" ry="11" fill="${C.glow}" opacity="0.5"/>`;
}

function omni(C) {
  const tiles = [190, 333, 476];
  let s = "";
  tiles.forEach((y) => {
    const cyc = y + 42;
    // connector to inbox
    s += `<path d="M 340 ${cyc} C 540 ${cyc} 540 368 720 368" fill="none" stroke="${C.borderStrong}" stroke-width="1.6" opacity="0.45"/>`;
  });
  tiles.forEach((y) => {
    s += `<rect x="210" y="${y}" width="130" height="84" rx="16" fill="${C.card2}" stroke="${C.border}" stroke-width="1.2"/>
      <circle cx="240" cy="${y + 30}" r="7" fill="${C.accent}"/>
      <rect x="258" y="${y + 24}" width="56" height="9" rx="4.5" fill="${C.line}" opacity="0.18"/>
      <rect x="234" y="${y + 50}" width="80" height="8" rx="4" fill="${C.line}" opacity="0.12"/>`;
  });
  // inbox card
  s += `<rect x="724" y="288" width="232" height="170" rx="22" fill="${C.card}" stroke="${C.borderStrong}" stroke-width="1.5"/>
    <rect x="752" y="318" width="96" height="20" rx="10" fill="${C.accent}"/>
    <rect x="752" y="356" width="176" height="11" rx="5.5" fill="${C.line}" opacity="0.16"/>
    <rect x="752" y="382" width="176" height="11" rx="5.5" fill="${C.line}" opacity="0.12"/>
    <rect x="752" y="408" width="120" height="11" rx="5.5" fill="${C.line}" opacity="0.1"/>
    <circle cx="724" cy="368" r="10" fill="${C.accent}"/>`;
  return s;
}

function graph(C) {
  const nodes = [
    { x: 320, y: 250, r: 11, fill: true },
    { x: 520, y: 175, r: 13, fill: false },
    { x: 740, y: 235, r: 11, fill: true },
    { x: 890, y: 330, r: 14, fill: false },
    { x: 640, y: 410, r: 12, fill: true },
    { x: 400, y: 470, r: 11, fill: false },
    { x: 820, y: 500, r: 10, fill: true },
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [0, 5], [5, 4], [4, 2], [4, 6], [6, 3]];
  let s = edges
    .map(([a, b]) => `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" stroke="${C.borderStrong}" stroke-width="1.5" opacity="0.4"/>`)
    .join("");
  s += nodes
    .map((n) =>
      n.fill
        ? `<circle cx="${n.x}" cy="${n.y}" r="20" fill="url(#halo)"/><circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${C.accent}"/>`
        : `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${C.card}" stroke="${C.borderStrong}" stroke-width="2"/>`
    )
    .join("");
  return s;
}

function route(C) {
  const path = "M 180 580 C 360 470 440 540 580 430 S 860 280 1020 210";
  let s = `<path d="${path}" fill="none" stroke="${C.borderStrong}" stroke-width="2.5" opacity="0.55" stroke-linecap="round" stroke-dasharray="2 14"/>`;
  s += `<path d="${path}" fill="none" stroke="${C.borderStrong}" stroke-width="1.4" opacity="0.3"/>`;
  // pins along the route
  const pins = [{ x: 180, y: 580 }, { x: 580, y: 430 }, { x: 1020, y: 210 }];
  pins.forEach((p, i) => {
    s += `<circle cx="${p.x}" cy="${p.y}" r="22" fill="url(#halo)"/>`;
    if (i === 2) {
      // destination — filled marker
      s += `<circle cx="${p.x}" cy="${p.y}" r="13" fill="${C.accent}"/><circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${C.onAccent}"/>`;
    } else {
      s += `<circle cx="${p.x}" cy="${p.y}" r="11" fill="${C.card}" stroke="${C.accent}" stroke-width="3"/>`;
    }
  });
  return s;
}

const MOTIFS = {
  "tek-cati-altinda-360": orbit,
  "omnichannel-gelen-kutusu": omni,
  "multi-tenant-mimari": graph,
  "saha-ekipleri-arac-takip": route,
};

function svg(slug, C) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.base1}"/>
      <stop offset="1" stop-color="${C.base2}"/>
    </linearGradient>
    <radialGradient id="bgGlow" cx="50%" cy="42%" r="62%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb" cx="40%" cy="36%" r="72%">
      <stop offset="0" stop-color="${C.orbHi}"/>
      <stop offset="0.55" stop-color="${C.orbMid}"/>
      <stop offset="1" stop-color="${C.orbLo}"/>
    </radialGradient>
    <radialGradient id="fadeG" cx="50%" cy="48%" r="62%">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.6" stop-color="#fff" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="fade"><rect width="${W}" height="${H}" fill="url(#fadeG)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
  ${grid(C)}
  ${MOTIFS[slug](C)}
</svg>`;
}

async function render(slug) {
  for (const [theme, C] of [["light", LIGHT], ["dark", DARK]]) {
    const name = `${slug}-${theme}.webp`;
    const info = await sharp(Buffer.from(svg(slug, C)), { density: 144 })
      .webp({ quality: 84, effort: 6 })
      .toFile(join(OUT, name));
    console.log(`✓ ${name}  ${(info.size / 1024).toFixed(1)} KB`);
  }
}

for (const slug of Object.keys(MOTIFS)) await render(slug);
console.log("done.");
