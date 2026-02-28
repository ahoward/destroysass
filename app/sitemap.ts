import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://destroysaas.coop";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/math`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ideas`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/cells`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about/philosophy`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/legal`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/money`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/authors`, changeFrequency: "monthly", priority: 0.5 },
  ];

  // dynamic idea pages
  const supabase = await createClient();
  const { data: ideas } = await supabase
    .from("idea_board")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  const ideaPages: MetadataRoute.Sitemap = (ideas ?? []).map((idea) => ({
    url: `${base}/ideas/${idea.id}`,
    lastModified: idea.created_at,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...ideaPages];
}
