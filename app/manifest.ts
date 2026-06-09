import type { MetadataRoute } from "next";
import { brandName, shortBrandName, siteUrl, studioName } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brandName} | ${studioName}`,
    short_name: shortBrandName,
    description:
      "Official Nikansha Yoga Arogya website for yoga classes in Ghaziabad and online wellness sessions.",
    start_url: siteUrl,
    scope: siteUrl,
    display: "standalone",
    background_color: "#502e03",
    theme_color: "#5b3904",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
