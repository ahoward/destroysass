# next-ro

> file-backed content for Next.js — GitHub is the CMS

## what it is

`next-ro` is a content layer for Next.js that stores content as markdown + YAML
files in `public/ro/`, compiles them to a static JSON API, and renders them with
`react-markdown` + Next.js `<Image>`. authors edit content on GitHub using the
native markdown editor with working image previews. the same compiled JSON is
consumed identically on server and client.

the name `ro` stands for "read-only" or "rich objects". inspired by
[ahoward/ro](https://github.com/ahoward/ro).

## directory structure

```
public/ro/
  pages/
    home.yml                          # page metadata (hero strings, SEO, section order)
    home/
      problem.md                      # long-form section
      saaspocalypse.md
      credit-union.md
      for-business.md
      for-cells.md
      for-investors.md
      assets/
        diagram.png                   # referenced as ./assets/diagram.png in markdown
    about.yml
    about/
      the-problem.md
      the-model.md
      faq.yml                         # structured data (Q&A pairs, tables, lists)
      assets/
        ...
```

### conventions

- `{slug}.yml` — page metadata. YAML. lives at collection level.
- `{slug}/` — directory of content files for that page.
- `{slug}/{section}.md` — markdown section. rendered to HTML. frontmatter merged into attributes.
- `{slug}/{section}.yml` — structured data. parsed as-is.
- `{slug}/assets/` — images and files. referenced with relative paths.

### asset paths

authors write relative paths in markdown:

```markdown
![architecture](./assets/diagram.png)
```

this renders correctly in GitHub's markdown preview (relative path from file
location) AND in the deployed app (expanded to absolute URL during build).

## build step: `ro build`

reads source files from `public/ro/`, compiles to static JSON at `public/api/ro/`.

```
public/api/ro/
  pages/home.json
  pages/about.json
  pages/math.json
  ...
```

### what the build does

1. reads `{slug}.yml` — parses metadata
2. reads `{slug}/*.md` — renders markdown to HTML via `react-markdown`/`remark`
3. reads `{slug}/*.yml` — parses structured data
4. **expands asset URLs** — rewrites `./assets/foo.png` to `/ro/pages/home/assets/foo.png`
5. **reads image dimensions** — `image-size` on every image asset, caches in output
6. writes compiled JSON to `public/api/ro/{slug}.json`

### asset URL expansion (from ahoward/ro)

two strategies, tried in order:

**accurate (primary):** parse rendered HTML into a real DOM (e.g. `htmlparser2` /
`linkedom`). traverse all elements, inspect all attributes. expand any value
matching `./assets/...` or `assets/...` to absolute URL. this catches `src`,
`href`, `poster`, `data-*` — anything. not hardcoded to specific attributes.

**sloppy (fallback):** regex from ruby ro:

```
/\s*=\s*['"](?:[.]\/)?assets\/[^'"\s]+['"]/
```

matches any HTML attribute whose value is an asset path. only replaces if the
file actually exists on disk.

**deep value expansion:** separately walks parsed YAML objects depth-first.
any string value matching `./assets/...` or `assets/...` is expanded. same
existence check.

### compiled JSON schema

```json
{
  "_meta": {
    "slug": "pages/home",
    "built_at": "2026-03-14T12:00:00Z"
  },
  "meta": {
    "title": "destroysaas — own the software you use",
    "description": "small businesses collectively fund...",
    "hero": {
      "headline": "the place where small businesses",
      "emphasis": "stop renting software",
      "tail": "and start owning it."
    }
  },
  "sections": {
    "problem": {
      "raw": "ai didn't drive software costs to zero...",
      "html": "<p>ai didn't drive software costs to zero...</p>"
    },
    "saaspocalypse": {
      "raw": "in february 2026, wall street...",
      "html": "<p>in february 2026, wall street...</p>"
    }
  },
  "data": {
    "faq": [
      { "q": "what is destroysaas?", "a": "a cooperative..." }
    ]
  },
  "images": {
    "./assets/diagram.png": {
      "src": "/ro/pages/home/assets/diagram.png",
      "width": 800,
      "height": 600
    }
  }
}
```

- `meta` — from `{slug}.yml`
- `sections` — from `{slug}/*.md`, keyed by filename (minus extension)
- `data` — from `{slug}/*.yml` (non-meta YAML files in the directory)
- `images` — dimension map for all images in `{slug}/assets/`

## rendering

one render function, used identically on server and client:

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

function ROSection({ raw, images }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt, ...props }) => {
          const info = images?.[src];
          return info
            ? <Image src={info.src} alt={alt ?? ""} width={info.width} height={info.height} />
            : <img src={src} alt={alt} {...props} />;
        }
      }}
    >
      {raw}
    </ReactMarkdown>
  );
}
```

renders raw markdown (not pre-rendered HTML) so that `react-markdown` can
transform `<img>` into `<Image>` with dimensions from the `images` map.

asset URL expansion happens in the `raw` markdown before it reaches
`react-markdown` — the `./assets/` paths are already rewritten to absolute
URLs in the compiled JSON.

both `html` and `raw` are included in the compiled JSON:
- `raw` — for `react-markdown` rendering with `<Image>` support
- `html` — for SEO, serialization, or contexts where react-markdown isn't available

## dev mode

in dev, no build step is needed. an API route intercepts requests to
`/api/ro/...` and compiles on the fly:

```
GET /api/ro/pages/home → app/api/ro/[...path]/route.ts → RO().page("pages/home") → JSON
```

in production, `public/api/ro/pages/home.json` (static file from build step)
shadows the API route. Next.js serves `public/` first. no conditional logic
needed.

same `RO()` reader powers both the dev API route and the build script.

### hot reload (dev only)

an SSE endpoint watches `public/ro/` for file changes:

```
GET /api/ro/__events
```

uses `fs.watch` (Node built-in, recursive) inside the API route handler.
file change → push event over SSE → client refetches specific page JSON →
`react-markdown` re-renders.

the `<RO>` client component connects to the SSE endpoint in dev:

```tsx
useEffect(() => {
  if (process.env.NODE_ENV !== "development") return;

  const es = new EventSource("/api/ro/__events");
  es.onmessage = (e) => {
    const { path } = JSON.parse(e.data);
    if (relevant(path)) refetch();
  };
  return () => es.close();
}, []);
```

in production, the SSE route is shadowed by static files and the client
skips the EventSource connection. zero overhead.

## library API

### `RO(root?: string)`

factory function. returns a reader bound to a root directory.

```ts
import { RO } from "next-ro";

const ro = RO();                          // default: public/ro
const ro = RO("public/ro-docs");          // custom root
```

### `ro.page(slug: string)`

reads and compiles a full page. returns the compiled JSON object.

```ts
const page = await ro.page("pages/home");
// { _meta, meta, sections, data, images }
```

### `ro.section(slug: string, section: string)`

reads and compiles a single section.

```ts
const s = await ro.section("pages/home", "problem");
// { raw, html }
```

### `ro.meta(slug: string)`

reads page metadata only.

```ts
const m = await ro.meta("pages/home");
// { title, description, hero: { ... } }
```

### `ro.build(outdir?: string)`

compiles all pages to static JSON. used by the build script.

```ts
await ro.build("public/api/ro");
```

## client component: `<RO>`

```tsx
import { RO } from "next-ro/client";

// server component fetches compiled JSON
const page = await ro.page("pages/home");

// client wrapper handles refetch
<RO path="pages/home" initial={page}>
  {({ sections, images }) => (
    <ROSection raw={sections.problem.raw} images={images} />
  )}
</RO>
```

- renders `initial` data immediately (SSR, SEO)
- in dev: connects to SSE, refetches on file change
- in production: refetches on `visibilitychange` (tab refocus)
- if response differs from current, re-renders
- if same, no-op

## vercel deployment

everything is static files on CDN:

- `public/ro/` — source markdown + assets (served at `/ro/...`)
- `public/api/ro/` — compiled JSON (served at `/api/ro/...`)

no serverless functions needed. no `fs` at runtime. no edge functions.

the build step (`ro build`) runs during `next build` (or as a prebuild script).
compiled JSON is committed to git or generated in CI.

## dependencies

- `js-yaml` — parse YAML files
- `image-size` — read image dimensions (build time only)
- `htmlparser2` or `linkedom` — accurate DOM parsing for asset expansion
- `react-markdown` — already in project deps
- `remark-gfm` — already in project deps

## non-goals

- no admin UI. GitHub is the CMS.
- no database. no cache layer beyond CDN.
- no MDX. plain markdown + YAML.
- no build-time React rendering. `html` in compiled JSON is plain HTML, not React server components.
- no incremental compilation (yet). `ro build` recompiles everything.
