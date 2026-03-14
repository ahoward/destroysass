import fs from "fs";
import path from "path";
import imageSize from "image-size";
import type { ROImage } from "./types";

const IMAGE_EXTENSIONS = new Set([
  ".webp", ".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff", ".svg",
]);

export function scanImages(assetDir: string, baseUrl: string): Record<string, ROImage> {
  const images: Record<string, ROImage> = {};

  if (!fs.existsSync(assetDir)) return images;

  const files = fs.readdirSync(assetDir, { recursive: true });

  for (const file of files) {
    const rel = String(file);
    const ext = path.extname(rel).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const abs = path.join(assetDir, rel);
    if (!fs.statSync(abs).isFile()) continue;

    const key = `./assets/${rel}`;
    const src = `${baseUrl}/assets/${rel}`;

    try {
      const buf = fs.readFileSync(abs);
      const dim = imageSize(buf);
      images[key] = {
        src,
        width: dim.width ?? 0,
        height: dim.height ?? 0,
      };
    } catch {
      images[key] = { src, width: 0, height: 0 };
    }
  }

  return images;
}
