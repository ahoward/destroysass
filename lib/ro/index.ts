import fs from "fs";
import path from "path";
import { compilePage, compileSection, discoverSlugs } from "./compile";
import type { ROReader, ROPage, ROSection } from "./types";
import yaml from "js-yaml";

export type { ROPage, ROSection, ROImage, ROReader, ROMeta } from "./types";
export { ROMarkdown, PROSE_CLASSES } from "./render";
export { RO as ROClient } from "./client";

export function RO(root?: string): ROReader {
  const resolvedRoot = root ?? path.join(process.cwd(), "public/ro");

  return {
    async page(slug: string): Promise<ROPage> {
      return compilePage(resolvedRoot, slug);
    },

    async section(slug: string, section: string): Promise<ROSection> {
      return compileSection(resolvedRoot, slug, section);
    },

    async meta(slug: string): Promise<Record<string, unknown>> {
      for (const ext of [".yml", ".yaml"]) {
        const p = path.join(resolvedRoot, `${slug}${ext}`);
        if (fs.existsSync(p)) {
          return (yaml.load(fs.readFileSync(p, "utf8")) as Record<string, unknown>) ?? {};
        }
      }
      return {};
    },

    async build(outdir?: string): Promise<void> {
      const outputDir = outdir ?? path.join(process.cwd(), "public/api/ro");
      const slugs = discoverSlugs(resolvedRoot);

      console.log(`ro.build: ${resolvedRoot} → ${outputDir}`);
      console.log(`ro.build: found ${slugs.length} pages`);

      const started = Date.now();

      for (const slug of slugs) {
        const page = await compilePage(resolvedRoot, slug);
        const outPath = path.join(outputDir, `${slug}.json`);

        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify(page, null, 2));

        console.log(`ro.build: ${slug} → ${outPath}`);
      }

      const elapsed = ((Date.now() - started) / 1000).toFixed(2);
      console.log(`ro.build: done in ${elapsed}s`);
    },
  };
}
