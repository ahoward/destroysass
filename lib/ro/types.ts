export interface ROImage {
  src: string;
  width: number;
  height: number;
}

export interface ROSection {
  raw: string;
  html: string;
}

export interface ROMeta {
  slug: string;
  built_at: string;
}

export interface ROPage {
  _meta: ROMeta;
  meta: Record<string, unknown>;
  sections: Record<string, ROSection>;
  data: Record<string, unknown>;
  images: Record<string, ROImage>;
  get(path: string): unknown;
}

export interface ROReader {
  page(slug: string): Promise<ROPage>;
  section(slug: string, section: string): Promise<ROSection>;
  meta(slug: string): Promise<Record<string, unknown>>;
  build(outdir?: string): Promise<void>;
}
