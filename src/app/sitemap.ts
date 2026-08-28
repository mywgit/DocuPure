import { MetadataRoute } from "next";
import { PDF_TOOLS } from "@/lib/toolsData";
import { ALTERNATIVE_PAGES } from "@/lib/alternativeData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdf.puretoolhub.com";
  const now = new Date();

  const toolRoutes: MetadataRoute.Sitemap = PDF_TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: tool.popular ? 0.95 : 0.85,
  }));

  const altRoutes: MetadataRoute.Sitemap = ALTERNATIVE_PAGES.map((alt) => ({
    url: `${baseUrl}${alt.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...toolRoutes,
    ...altRoutes,
  ];
}
