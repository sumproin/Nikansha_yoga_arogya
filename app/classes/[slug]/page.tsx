import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoProgramPage from "@/components/SeoProgramPage";
import { getSeoPage, pageUrl, servicePages } from "@/app/seo-pages";
import { seoKeywords } from "@/app/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page || !servicePages.some((servicePage) => servicePage.slug === slug)) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [...seoKeywords, ...page.keywords],
    alternates: {
      canonical: pageUrl(slug),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: pageUrl(slug),
    },
  };
}

export default async function ClassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page || !servicePages.some((servicePage) => servicePage.slug === slug)) {
    notFound();
  }

  return <SeoProgramPage page={page} canonicalUrl={pageUrl(slug)} />;
}
