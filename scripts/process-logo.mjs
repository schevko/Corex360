import fs from "fs";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const img = await loadImage(fs.readFileSync("public/logo-raw.png"));
const W = img.width;
const H = img.height;

const src = createCanvas(W, H);
const sctx = src.getContext("2d");
sctx.drawImage(img, 0, 0);
const data = sctx.getImageData(0, 0, W, H);
const px = data.data;

// 1) tight bbox of non-white ink
let minX = W, minY = H, maxX = 0, maxY = 0;
const lumAt = (i) => 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    if (px[i + 3] > 8 && lumAt(i) < 245) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const pad = Math.round((maxY - minY) * 0.12);
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(W - 1, maxX + pad);
maxY = Math.min(H - 1, maxY + pad);
const bw = maxX - minX + 1;
const bh = maxY - minY + 1;

const hex = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));

// 2) recolor: dark ink (COREX) -> c1, gray ink (360) -> c2, white -> transparent.
function recolor(c1hex, c2hex, file) {
  const c1 = hex(c1hex);
  const c2 = hex(c2hex);
  const out = createCanvas(bw, bh);
  const octx = out.getContext("2d");
  const odata = octx.createImageData(bw, bh);
  const o = odata.data;
  for (let y = 0; y < bh; y++) {
    for (let x = 0; x < bw; x++) {
      const si = ((y + minY) * W + (x + minX)) * 4;
      const di = (y * bw + x) * 4;
      const L = lumAt(si);
      let a, c;
      if (L >= 248) {
        a = 0; c = c1;
      } else if (L < 110) {
        a = 1 - L / 255; c = c1; // black ink (COREX)
      } else {
        a = Math.min(1, (255 - L) / 105); c = c2; // gray ink (360)
      }
      o[di] = c[0];
      o[di + 1] = c[1];
      o[di + 2] = c[2];
      o[di + 3] = Math.round(a * 255);
    }
  }
  octx.putImageData(odata, 0, 0);

  // downscale to ~900px wide for the web
  const targetW = Math.min(900, bw);
  const targetH = Math.round((bh * targetW) / bw);
  const fin = createCanvas(targetW, targetH);
  const fctx = fin.getContext("2d");
  fctx.imageSmoothingEnabled = true;
  fctx.drawImage(out, 0, 0, bw, bh, 0, 0, targetW, targetH);
  fs.writeFileSync(`public/${file}`, fin.toBuffer("image/png"));
  console.log(file, `${targetW}x${targetH}  (bbox ${bw}x${bh})`);
}

// Warm monochrome. Dark-bg: warm ivory + warm gray.  Light-bg: warm graphite + warm gray.
recolor("#f2efe8", "#a39c8e", "logo-dark.png");
recolor("#1c1a15", "#8a8377", "logo-light.png");
console.log("aspect", (bw / bh).toFixed(3));
