import fs from "fs";
import { pathToFileURL } from "url";
import { createCanvas, DOMMatrix, Path2D, ImageData } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// Minimal DOM polyfills pdf.js expects in Node.
globalThis.DOMMatrix = DOMMatrix;
globalThis.Path2D = Path2D;
globalThis.ImageData = ImageData;

const cMapUrl = pathToFileURL("node_modules/pdfjs-dist/cmaps/").href;
const standardFontDataUrl = pathToFileURL(
  "node_modules/pdfjs-dist/standard_fonts/"
).href;

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(Math.ceil(width), Math.ceil(height));
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(cc, width, height) {
    cc.canvas.width = Math.ceil(width);
    cc.canvas.height = Math.ceil(height);
  }
  destroy(cc) {
    cc.canvas.width = 0;
    cc.canvas.height = 0;
  }
}

const data = new Uint8Array(fs.readFileSync("COREX360 LOGO.pdf"));
const canvasFactory = new NodeCanvasFactory();

const doc = await pdfjs.getDocument({
  data,
  cMapUrl,
  cMapPacked: true,
  standardFontDataUrl,
  canvasFactory,
}).promise;

const page = await doc.getPage(1);
const scale = 4;
const viewport = page.getViewport({ scale });
const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);

await page.render({ canvasContext: context, viewport, canvasFactory }).promise;

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/logo-raw.png", canvas.toBuffer("image/png"));
console.log("rendered:", Math.ceil(viewport.width), "x", Math.ceil(viewport.height));
