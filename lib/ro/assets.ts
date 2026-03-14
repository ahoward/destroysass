import fs from "fs";
import path from "path";
import { parseDocument } from "htmlparser2";
import { getElementsByTagName, getAttributeValue, textContent } from "domutils";
import render from "dom-serializer";
import type { Element } from "domhandler";

type ExpandStrategies = Array<(html: string, baseUrl: string, assetDir: string) => string>;

const EXPAND_STRATEGIES: ExpandStrategies = [
  accurateExpand,
  sloppyExpand,
];

// expand asset URLs in rendered HTML
// tries accurate DOM parse first, falls back to regex
export function expandAssetUrls(html: string, baseUrl: string, assetDir: string): string {
  let lastError: unknown;

  for (const strategy of EXPAND_STRATEGIES) {
    try {
      return strategy(html, baseUrl, assetDir);
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError;
}

// accurate: parse HTML, walk all elements, expand attribute values
function accurateExpand(html: string, baseUrl: string, assetDir: string): string {
  const doc = parseDocument(html);

  const elements = getElementsByTagName("*", doc, true) as Element[];

  for (const el of elements) {
    if (!el.attribs) continue;

    for (const [attr, value] of Object.entries(el.attribs)) {
      const expanded = expandAssetPath(value, baseUrl, assetDir);
      if (expanded !== value) {
        el.attribs[attr] = expanded;
      }
    }
  }

  return render(doc);
}

// sloppy: regex fallback matching attribute="./assets/..." or attribute="assets/..."
// from ahoward/ro: %r`\s*=\s*['"](?:[.]/)?(assets/[^'"\s]+)['"]`
function sloppyExpand(html: string, baseUrl: string, assetDir: string): string {
  const re = /(\s*=\s*['"])(?:\.\/)?(assets\/[^'"\s]+)(['"])/g;

  return html.replace(re, (match, prefix, assetPath, suffix) => {
    const abs = path.join(assetDir, "..", assetPath);

    if (fs.existsSync(abs)) {
      const url = `${baseUrl}/${assetPath}`;
      return `${prefix}${url}${suffix}`;
    }

    return match;
  });
}

// expand a single attribute value if it's an asset path
function expandAssetPath(value: string, baseUrl: string, assetDir: string): string {
  const trimmed = value.trim();
  const assetMatch = trimmed.match(/^(?:\.\/)?(assets\/.+)$/);

  if (!assetMatch) return value;

  const assetPath = assetMatch[1];
  const abs = path.join(assetDir, "..", assetPath);

  if (fs.existsSync(abs)) {
    return `${baseUrl}/${assetPath}`;
  }

  return value;
}

// expand asset paths in raw markdown (before rendering)
export function expandRaw(markdown: string, baseUrl: string, assetDir: string): string {
  // markdown image syntax: ![alt](./assets/foo.png)
  const mdImageRe = /(\!\[[^\]]*\]\()(?:\.\/)?(assets\/[^)\s]+)(\))/g;

  let result = markdown.replace(mdImageRe, (match, prefix, assetPath, suffix) => {
    const abs = path.join(assetDir, "..", assetPath);
    if (fs.existsSync(abs)) {
      return `${prefix}${baseUrl}/${assetPath}${suffix}`;
    }
    return match;
  });

  // HTML img tags in markdown: src="./assets/foo.png"
  const htmlAttrRe = /(\s(?:src|href)=['"])(?:\.\/)?(assets\/[^'"\s]+)(['"])/g;

  result = result.replace(htmlAttrRe, (match, prefix, assetPath, suffix) => {
    const abs = path.join(assetDir, "..", assetPath);
    if (fs.existsSync(abs)) {
      return `${prefix}${baseUrl}/${assetPath}${suffix}`;
    }
    return match;
  });

  return result;
}

// deep expansion: walk parsed YAML/JSON objects depth-first
// expand any string value that is an asset path
export function expandDeep(
  obj: unknown,
  baseUrl: string,
  assetDir: string
): unknown {
  if (typeof obj === "string") {
    const trimmed = obj.trim();
    const match = trimmed.match(/^(?:\.\/)?(assets\/[^\s]+)$/);

    if (match) {
      const assetPath = match[1];
      const abs = path.join(assetDir, "..", assetPath);
      if (fs.existsSync(abs)) {
        return `${baseUrl}/${assetPath}`;
      }
    }

    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => expandDeep(item, baseUrl, assetDir));
  }

  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = expandDeep(value, baseUrl, assetDir);
    }
    return result;
  }

  return obj;
}
