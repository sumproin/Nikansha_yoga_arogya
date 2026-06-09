import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";
import { landingPages, pageUrl, servicePages } from "./seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const basePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/classes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/resources`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const landingSeoPages: MetadataRoute.Sitemap = landingPages.map((page) => ({
    url: pageUrl(page.slug),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  const classSeoPages: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: pageUrl(page.slug),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  return [...basePages, ...landingSeoPages, ...classSeoPages];
}
