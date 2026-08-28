import React from "react";
import { Metadata } from "next";
import { getAlternativePageBySlug } from "@/lib/alternativeData";
import { AlternativeLayout } from "@/components/AlternativeLayout";

const pageData = getAlternativePageBySlug("smallpdf-alternative")!;

export const metadata: Metadata = {
  title: pageData.locales.en.metaTitle,
  description: pageData.locales.en.metaDescription,
  alternates: {
    canonical: `https://pdf.puretoolhub.com${pageData.path}`,
  },
  openGraph: {
    title: pageData.locales.en.metaTitle,
    description: pageData.locales.en.metaDescription,
    url: `https://pdf.puretoolhub.com${pageData.path}`,
    siteName: "DocuPure",
  },
};

export default function SmallpdfAlternativePage() {
  return <AlternativeLayout page={pageData} />;
}
