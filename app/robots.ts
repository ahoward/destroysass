import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/auth", "/lobby", "/me", "/profile"],
    },
    sitemap: "https://destroysaas.coop/sitemap.xml",
  };
}
