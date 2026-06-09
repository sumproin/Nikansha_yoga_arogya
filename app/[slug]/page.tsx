import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoProgramPage from "@/components/SeoProgramPage";
import { getSeoPage, landingPages, pageUrl } from "@/app/seo-pages";
import { seoKeywords } from "@/app/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page || !landingPages.some((landingPage) => landingPage.slug === slug)) {
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

export default async function LandingSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page || !landingPages.some((landingPage) => landingPage.slug === slug)) {
    notFound();
  }

  return <SeoProgramPage page={page} canonicalUrl={pageUrl(slug)} />;
}
