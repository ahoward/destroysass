import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { expandAssetUrls, expandRaw, expandDeep } from "./assets";
import { scanImages } from "./images";
import dlv from "dlv";
import type { ROPage, ROSection } from "./types";

const MD_EXTENSIONS = new Set([".md", ".markdown"]);
const YAML_EXTENSIONS = new Set([".yml", ".yaml"]);
const ATTRIBUTES_NAMES = new Set(["attributes.yml", "attributes.yaml"]);

const remarkPipeline = remark().use(remarkGfm).use(remarkHtml);

async function renderMarkdown(raw: string): Promise<string> {
  const result = await remarkPipeline.process(raw);
  return String(result);
}

export async function compilePage(root: string, slug: string): Promise<ROPage> {
  const pageDir = path.join(root, slug);
  const metaPath = findMetaFile(pageDir);
  const meta = metaPath ? (yaml.load(fs.readFileSync(metaPath, "utf8")) as Record<string, unknown>) : {};

  const assetDir = path.join(pageDir, "assets");
  const baseUrl = `/ro/${slug}`;

  // compile markdown sections
  const sections: Record<string, ROSection> = {};

  if (fs.existsSync(pageDir) && fs.statSync(pageDir).isDirectory()) {
    const entries = fs.readdirSync(pageDir);

    for (const entry of entries) {
      if (entry === "assets") continue;
      if (ATTRIBUTES_NAMES.has(entry.toLowerCase())) continue;

      const entryPath = path.join(pageDir, entry);
      if (!fs.statSync(entryPath).isFile()) continue;

      const ext = path.extname(entry).toLowerCase();
      if (!MD_EXTENSIONS.has(ext)) continue;

      const stem = path.basename(entry, ext);
      const name = stem.toLowerCase() === "readme" ? "content" : stem;

      sections[name] = await compileMarkdownFile(entryPath, baseUrl, assetDir);
    }
  }

  const images = scanImages(assetDir, baseUrl);

  const expandedMeta = expandDeep(meta, baseUrl, assetDir) as Record<string, unknown>;

  return {
    _meta: {
      slug,
      built_at: new Date().toISOString(),
    },
    meta: expandedMeta,
    sections,
    data: expandedMeta,
    images,
    get(dotpath: string): unknown {
      return dlv(expandedMeta, dotpath);
    },
  };
}

export async function compileSection(
  root: string,
  slug: string,
  section: string
): Promise<ROSection> {
  const pageDir = path.join(root, slug);
  const assetDir = path.join(pageDir, "assets");
  const baseUrl = `/ro/${slug}`;

  const mdPath = path.join(pageDir, `${section}.md`);
  if (!fs.existsSync(mdPath)) {
    throw new Error(`Section not found: ${mdPath}`);
  }

  return compileMarkdownFile(mdPath, baseUrl, assetDir);
}

async function compileMarkdownFile(
  filePath: string,
  baseUrl: string,
  assetDir: string
): Promise<ROSection> {
  const source = fs.readFileSync(filePath, "utf8");
  const raw = expandRaw(source, baseUrl, assetDir);
  const htmlRaw = await renderMarkdown(source);
  const html = expandAssetUrls(htmlRaw, baseUrl, assetDir);

  return { raw, html };
}

function findMetaFile(pageDir: string): string | null {
  for (const name of ATTRIBUTES_NAMES) {
    const p = path.join(pageDir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export function discoverSlugs(root: string): string[] {
  const slugs: string[] = [];

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      if (entry === "assets") continue;

      const entryPath = path.join(dir, entry);
      if (!fs.statSync(entryPath).isDirectory()) continue;

      const slug = prefix ? `${prefix}/${entry}` : entry;

      // a page directory contains attributes.yml
      const subEntries = fs.readdirSync(entryPath);
      const hasAttributes = subEntries.some((e) => ATTRIBUTES_NAMES.has(e.toLowerCase()));

      if (hasAttributes) {
        slugs.push(slug);
      }

      // always recurse — pages can be nested
      walk(entryPath, slug);
    }
  }

  walk(root, "");
  return slugs.sort();
}
