import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { expandAssetUrls, expandRaw, expandDeep } from "./assets";
import { scanImages } from "./images";
import type { ROPage, ROSection } from "./types";

const MD_EXTENSIONS = new Set([".md", ".markdown"]);
const YAML_EXTENSIONS = new Set([".yml", ".yaml"]);

const remarkPipeline = remark().use(remarkGfm).use(remarkHtml);

async function renderMarkdown(raw: string): Promise<string> {
  const result = await remarkPipeline.process(raw);
  return String(result);
}

export async function compilePage(root: string, slug: string): Promise<ROPage> {
  const metaPath = findMetaFile(root, slug);
  const meta = metaPath ? (yaml.load(fs.readFileSync(metaPath, "utf8")) as Record<string, unknown>) : {};

  const sectionDir = path.join(root, slug);
  const assetDir = path.join(sectionDir, "assets");
  const baseUrl = `/ro/${slug}`;

  const sections: Record<string, ROSection> = {};
  const data: Record<string, unknown> = {};

  if (fs.existsSync(sectionDir) && fs.statSync(sectionDir).isDirectory()) {
    const entries = fs.readdirSync(sectionDir);

    for (const entry of entries) {
      if (entry === "assets") continue;

      const entryPath = path.join(sectionDir, entry);
      if (!fs.statSync(entryPath).isFile()) continue;

      const ext = path.extname(entry).toLowerCase();
      const name = path.basename(entry, ext);

      if (MD_EXTENSIONS.has(ext)) {
        sections[name] = await compileMarkdownFile(entryPath, baseUrl, assetDir);
      } else if (YAML_EXTENSIONS.has(ext)) {
        const raw = fs.readFileSync(entryPath, "utf8");
        const parsed = yaml.load(raw);
        data[name] = expandDeep(parsed, baseUrl, assetDir);
      }
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
    data,
    images,
  };
}

export async function compileSection(
  root: string,
  slug: string,
  section: string
): Promise<ROSection> {
  const sectionDir = path.join(root, slug);
  const assetDir = path.join(sectionDir, "assets");
  const baseUrl = `/ro/${slug}`;

  const mdPath = path.join(sectionDir, `${section}.md`);
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

function findMetaFile(root: string, slug: string): string | null {
  for (const ext of [".yml", ".yaml"]) {
    const p = path.join(root, `${slug}${ext}`);
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
      const entryPath = path.join(dir, entry);
      const ext = path.extname(entry).toLowerCase();

      if (YAML_EXTENSIONS.has(ext) && fs.statSync(entryPath).isFile()) {
        const name = path.basename(entry, ext);
        const slug = prefix ? `${prefix}/${name}` : name;
        slugs.push(slug);
      }
    }

    // recurse into subdirectories that aren't node directories (those with a sibling .yml)
    for (const entry of entries) {
      const entryPath = path.join(dir, entry);
      if (entry === "assets") continue;
      if (!fs.statSync(entryPath).isDirectory()) continue;

      // check if this directory is a section dir (has a sibling .yml)
      const hasSiblingMeta = entries.some(
        (e) => YAML_EXTENSIONS.has(path.extname(e).toLowerCase()) && path.basename(e, path.extname(e)) === entry
      );

      if (!hasSiblingMeta) {
        // it's a namespace directory, recurse
        walk(entryPath, prefix ? `${prefix}/${entry}` : entry);
      }
    }
  }

  walk(root, "");
  return slugs.sort();
}
