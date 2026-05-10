"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { api, type GalleryItem } from "@/lib/api";

const INITIAL_VISIBLE_ITEMS = 18;
const LOAD_MORE_COUNT = 18;

function withCloudinaryOptimization(url: string, width: number) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,dpr_auto,w_${width},c_limit/`);
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getGalleryItems();
        setItems(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="gallery" className="bg-background py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-amber-700 uppercase relative"
      >
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
        Our Gallery
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
      </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-serif text-4xl md:text-5xl"
          >
            Studio Gallery
          </motion.h2>
          <p className="text-muted-foreground">Photos and videos from our classes, sessions, and events.</p>
        </div>

        {loading ? <p className="text-center text-muted-foreground">Loading gallery...</p> : null}
        {error ? <p className="text-center text-destructive">{error}</p> : null}

        {!loading && !error ? (
          <div className="columns-2 gap-2 sm:columns-3 lg:columns-4 xl:columns-5">
            {items.slice(0, visibleCount).map((item, index) => (
              <article
                key={item._id}
                className={`group relative mb-2 break-inside-avoid overflow-hidden rounded-md bg-card ${
                  index % 5 === 0
                    ? "aspect-[3/4]"
                    : index % 5 === 1
                      ? "aspect-square"
                      : index % 5 === 2
                        ? "aspect-[4/5]"
                        : index % 5 === 3
                          ? "aspect-[5/4]"
                          : "aspect-[2/3]"
                }`}
                style={{ contentVisibility: "auto", containIntrinsicSize: "300px 420px" }}
              >
                {!loadedMedia[item._id] ? (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-amber-100/50 via-amber-50/40 to-stone-100/50" />
                ) : null}
                {item.mediaType === "image" ? (
                  <img
                    src={withCloudinaryOptimization(item.mediaUrl, 520)}
                    alt="Gallery media"
                    className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] ${
                      loadedMedia[item._id] ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onLoad={() => setLoadedMedia((prev) => ({ ...prev, [item._id]: true }))}
                  />
                ) : (
                  <video
                    src={withCloudinaryOptimization(item.mediaUrl, 640)}
                    controls
                    className="h-full w-full object-cover"
                    preload="metadata"
                    onLoadedData={() => setLoadedMedia((prev) => ({ ...prev, [item._id]: true }))}
                  />
                )}
              </article>
            ))}
          </div>
        ) : null}

        {!loading && !error && items.length === 0 ? (
          <p className="text-center text-muted-foreground">No gallery uploads yet. Check back soon.</p>
        ) : null}
        {!loading && !error && visibleCount < items.length ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, items.length))}
              className="rounded-full border border-earth/30 bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-cream"
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
