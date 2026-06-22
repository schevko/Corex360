import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const SRC = "C:/Users/SAVAS/Vesya Portfolyo/Referans Logo";
const OUT = "public/logos";
fs.mkdirSync(OUT, { recursive: true });

// Selected clean, recognizable wordmark-style logos -> output slug.
const LOGOS = [
  ["toki-logo.png", "toki"],
  ["Emlak_konut_logo.png", "emlak-konut"],
  ["ems_yapi_logo.png", "ems-yapi"],
  ["marriott-new.png", "mbd"],
  ["Varlik-1@3x.png", "seba"],
  ["losev_dark_logo.1b01b80a.png", "losev"],
];

// Uniform warm-light tone so every logo reads cohesively on the dark strip.
const TONE = [216, 211, 200]; // #d8d3c8

for (const [file, slug] of LOGOS) {
  const img = await loadImage(fs.readFileSync(path.join(SRC, file)));
  const W = img.width, H = img.height;
  const c = createCanvas(W, H);
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, W, H).data;
  const lum = (i) => 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];

  // Detect background from the 4 corners.
  const corners = [0, (W - 1) * 4, (H - 1) * W * 4, ((H - 1) * W + (W - 1)) * 4];
  let aSum = 0, lSum = 0;
  for (const i of corners) { aSum += px[i + 3]; lSum += lum(i); }
  const whiteBg = aSum / 4 > 30 && lSum / 4 > 232;

  const cov = new Float32Array(W * H);
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    const a = px[i + 3] / 255;
    let c0;
    if (whiteBg) c0 = (1 - lum(i) / 255) * (a || 1);
    else c0 = a;
    cov[p] = Math.pow(Math.max(0, Math.min(1, c0)), 0.75); // strengthen mid-tones
  }

  // bbox
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (cov[y * W + x] > 0.08) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
  const bw = maxX - minX + 1, bh = maxY - minY + 1;

  const out = createCanvas(bw, bh);
  const octx = out.getContext("2d");
  const od = octx.createImageData(bw, bh);
  for (let y = 0; y < bh; y++)
    for (let x = 0; x < bw; x++) {
      const di = (y * bw + x) * 4;
      const a = cov[(y + minY) * W + (x + minX)];
      od.data[di] = TONE[0];
      od.data[di + 1] = TONE[1];
      od.data[di + 2] = TONE[2];
      od.data[di + 3] = Math.round(a * 255);
    }
  octx.putImageData(od, 0, 0);

  // downscale to a tidy height (~120px, retina)
  const targetH = 120;
  const targetW = Math.round((bw * targetH) / bh);
  const fin = createCanvas(targetW, targetH);
  const fctx = fin.getContext("2d");
  fctx.imageSmoothingEnabled = true;
  fctx.drawImage(out, 0, 0, bw, bh, 0, 0, targetW, targetH);
  fs.writeFileSync(path.join(OUT, `${slug}.png`), fin.toBuffer("image/png"));
  console.log(`${slug}.png  ${targetW}x${targetH}  ${whiteBg ? "whiteBg" : "alpha"}`);
}
console.log("done");
