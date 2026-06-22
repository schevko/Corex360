// Generates the Resources/Kaynaklar hub artwork as crisp, lightweight WebP from
// pure-vector SVG (no external photos) — warm-ivory MONOCHROME, matching the
// globals.css light tokens exactly (NO hue, NO gold). Two distinct motifs so the
// hero and the narrative "core" card don't read as the same image:
//   • hero  → a 360° orbital field: a luminous core with satellite nodes on
//             tilted concentric rings over a faint blueprint grid.
//   • core  → layered resource panels: stacked translucent sheets standing in
//             for docs / videos / stories / webinar.
// Run: node scripts/render-resources-art.mjs   (sharp is already a dependency)
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "team");

// ── Warm-ivory light palette (mirrors :root in src/app/globals.css) ──────────
const C = {
  baseTop: "#f6f4ef",
  baseBottom: "#eae5db",
  surface: "#fbfaf5",
  surface2: "#f1ede4",
  glow: "#fffdf8",
  graphite: "#1c1a15",
  border: "#e0dbce",
  borderStrong: "#cdc6b6",
};

const round = (n) => Math.round(n * 100) / 100;

// A faint blueprint grid, radially masked so it fades toward the edges.
function grid(w, h, step, opacity) {
  let lines = "";
  for (let x = step; x < w; x += step)
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = step; y < h; y += step)
    lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g mask="url(#gridFade)" stroke="${C.graphite}" stroke-width="1" opacity="${opacity}">${lines}</g>`;
}

// ── HERO — 2000×1120, 360° orbital field ─────────────────────────────────────
function heroSvg() {
  const w = 2000,
    h = 1120;
  const cx = 1000,
    cy = 500;
  const tilt = -14;

  // Concentric rings (drawn in a tilted plane); ry is squashed for perspective.
  const rings = [
    { rx: 232, o: 0.16 },
    { rx: 372, o: 0.11 },
    { rx: 532, o: 0.075 },
    { rx: 712, o: 0.05 },
    { rx: 910, o: 0.035 },
  ];
  const ringEls = rings
    .map(
      (r) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${r.rx}" ry="${round(
          r.rx * 0.8
        )}" fill="none" stroke="${C.graphite}" stroke-width="1.3" opacity="${r.o}"/>`
    )
    .join("");

  // Satellite nodes sitting on rings (the four resources orbiting the core).
  const nodeDefs = [
    { rx: 372, deg: 34 },
    { rx: 532, deg: 158 },
    { rx: 712, deg: 256 },
    { rx: 232, deg: 308 },
  ];
  const nodes = nodeDefs
    .map(({ rx, deg }) => {
      const t = (deg * Math.PI) / 180;
      const x = round(cx + rx * Math.cos(t));
      const y = round(cy + rx * 0.8 * Math.sin(t));
      return `<circle cx="${x}" cy="${y}" r="26" fill="url(#nodeHalo)"/><circle cx="${x}" cy="${y}" r="6.5" fill="${C.graphite}" opacity="0.72"/><circle cx="${round(
        x - 2
      )}" cy="${round(y - 2)}" r="2" fill="${C.glow}" opacity="0.7"/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.baseTop}"/>
      <stop offset="1" stop-color="${C.baseBottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.9"/>
      <stop offset="0.55" stop-color="${C.glow}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="46%" r="62%">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="nodeHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.graphite}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${C.graphite}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb" cx="40%" cy="36%" r="72%">
      <stop offset="0" stop-color="#fffefb"/>
      <stop offset="0.45" stop-color="#e7e1d4"/>
      <stop offset="0.8" stop-color="#cfc8b9"/>
      <stop offset="1" stop-color="#bcb4a3"/>
    </radialGradient>
    <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridFade"><rect width="${w}" height="${h}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#base)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${grid(w, h, 80, 0.05)}

  <g transform="rotate(${tilt} ${cx} ${cy})">
    ${ringEls}
    ${nodes}
  </g>

  <circle cx="${cx}" cy="${cy}" r="150" fill="url(#orbGlow)"/>
  <circle cx="${cx}" cy="${cy}" r="74" fill="url(#orb)"/>
  <circle cx="${cx}" cy="${cy}" r="74" fill="none" stroke="${C.borderStrong}" stroke-width="1" opacity="0.55"/>
  <ellipse cx="${cx - 22}" cy="${cy - 26}" rx="26" ry="18" fill="${C.glow}" opacity="0.5"/>
</svg>`;
}

// ── CORE — 1448×1086, layered resource panels ────────────────────────────────
function coreSvg() {
  const w = 1448,
    h = 1086;
  const cx = w / 2;

  // Back-to-front stack of rounded sheets (the resources as tangible layers).
  const panels = [
    { y: 300, pw: 540, ph: 128, fill: C.surface2, o: 0.6 },
    { y: 414, pw: 612, ph: 138, fill: "#f5f1e9", o: 0.78 },
    { y: 540, pw: 684, ph: 150, fill: C.surface, o: 0.92 },
  ];
  const stack = panels
    .map((p) => {
      const x = round(cx - p.pw / 2);
      return `<ellipse cx="${cx}" cy="${round(p.y + p.ph + 14)}" rx="${round(
        p.pw / 2 - 10
      )}" ry="16" fill="url(#shadow)"/><rect x="${x}" y="${p.y}" width="${p.pw}" height="${p.ph}" rx="20" fill="${p.fill}" fill-opacity="${p.o}" stroke="${C.border}" stroke-width="1.2"/>`;
    })
    .join("");

  // Front sheet with content: an accent tile + two text-line bars + a node.
  const fy = 678,
    fw = 744,
    fh = 168,
    fx = round(cx - fw / 2);
  const front = `
    <ellipse cx="${cx}" cy="${fy + fh + 16}" rx="${round(
    fw / 2 - 6
  )}" ry="20" fill="url(#shadow)"/>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="22" fill="#fdfcf8" stroke="${C.borderStrong}" stroke-width="1.3"/>
    <rect x="${fx + 40}" y="${fy + 44}" width="80" height="80" rx="18" fill="${C.graphite}"/>
    <circle cx="${fx + 80}" cy="${fy + 84}" r="13" fill="none" stroke="${C.glow}" stroke-width="3" opacity="0.85"/>
    <rect x="${fx + 156}" y="${fy + 56}" width="430" height="14" rx="7" fill="${C.graphite}" opacity="0.16"/>
    <rect x="${fx + 156}" y="${fy + 92}" width="300" height="14" rx="7" fill="${C.graphite}" opacity="0.1"/>
    <circle cx="${fx + fw - 50}" cy="${fy + fh / 2}" r="7" fill="${C.graphite}" opacity="0.55"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.baseTop}"/>
      <stop offset="1" stop-color="${C.baseBottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="60%">
      <stop offset="0" stop-color="${C.glow}" stop-opacity="0.85"/>
      <stop offset="0.6" stop-color="${C.glow}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${C.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="46%" r="64%">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.55" stop-color="#fff" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.graphite}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${C.graphite}" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridFade"><rect width="${w}" height="${h}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#base)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${grid(w, h, 72, 0.045)}

  <g opacity="0.9">
    <path d="M ${cx - 360} 250 A 360 360 0 0 1 ${cx + 360} 250" fill="none" stroke="${C.graphite}" stroke-width="1.2" opacity="0.08"/>
  </g>

  ${stack}
  ${front}
</svg>`;
}

async function render(name, svg) {
  const buf = Buffer.from(svg);
  const out = join(OUT, name);
  const info = await sharp(buf, { density: 144 })
    .webp({ quality: 86, effort: 6 })
    .toFile(out);
  console.log(`✓ ${name}  ${(info.size / 1024).toFixed(1)} KB  ${info.width}×${info.height}`);
}

await render("resources-hero.webp", heroSvg());
await render("resources-core.webp", coreSvg());
console.log("done.");
