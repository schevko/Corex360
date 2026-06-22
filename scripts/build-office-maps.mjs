// Build self-hosted static maps for the contact page by stitching OSM tiles.
// One-off / re-runnable. Output: public/map/<key>.webp (centered on each office).
// Respects the OSM tile usage policy (valid UA, low one-off volume). Attribution
// "© OpenStreetMap contributors" is shown on the page.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const offices = [
  { key: "itu", lat: 41.1056, lng: 29.0233 },
  { key: "sancaktepe", lat: 41.0007, lng: 29.2314 },
];
const Z = 15;
const W = 1920;
const H = 820;
const TILE = 256;
const UA = "Corex360-staticmap/1.0 (+https://corex360.com; yasinsavas.work@gmail.com)";
const mapSize = TILE * 2 ** Z;

const lngToPx = (lng) => ((lng + 180) / 360) * mapSize;
const latToPx = (lat) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * mapSize;
};

async function fetchTile(x, y) {
  const url = `https://tile.openstreetmap.org/${Z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`tile ${x}/${y} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

mkdirSync("public/map", { recursive: true });

for (const o of offices) {
  const cx = lngToPx(o.lng);
  const cy = latToPx(o.lat);
  const left = Math.round(cx - W / 2);
  const top = Math.round(cy - H / 2);

  const txMin = Math.floor(left / TILE);
  const txMax = Math.floor((left + W - 1) / TILE);
  const tyMin = Math.floor(top / TILE);
  const tyMax = Math.floor((top + H - 1) / TILE);

  const cols = txMax - txMin + 1;
  const rows = tyMax - tyMin + 1;

  const composites = [];
  for (let ty = tyMin; ty <= tyMax; ty++) {
    for (let tx = txMin; tx <= txMax; tx++) {
      const buf = await fetchTile(tx, ty);
      composites.push({ input: buf, left: (tx - txMin) * TILE, top: (ty - tyMin) * TILE });
    }
  }

  const stitched = await sharp({
    create: {
      width: cols * TILE,
      height: rows * TILE,
      channels: 3,
      background: { r: 242, g: 239, b: 233 },
    },
  })
    .composite(composites)
    .png()
    .toBuffer();

  const cropLeft = left - txMin * TILE;
  const cropTop = top - tyMin * TILE;

  const out = `public/map/${o.key}.webp`;
  const info = await sharp(stitched)
    .extract({ left: cropLeft, top: cropTop, width: W, height: H })
    .webp({ quality: 80 })
    .toFile(out);

  console.log(`✓ ${out} ${info.width}x${info.height} ${(info.size / 1024) | 0}KB (${composites.length} tiles)`);
}
