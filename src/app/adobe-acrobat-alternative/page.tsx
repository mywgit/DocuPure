import React from "react";
import { Metadata } from "next";
import { getAlternativePageBySlug } from "@/lib/alternativeData";
import { AlternativeLayout } from "@/components/AlternativeLayout";

const pageData = getAlternativePageBySlug("adobe-acrobat-alternative")!;

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: {
    canonical: `https://pdf.puretoolhub.com${pageData.path}`,
  },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://pdf.puretoolhub.com${pageData.path}`,
    siteName: "DocuPure",
  },
};

export default function AdobeAlternativePage() {
  return <AlternativeLayout page={pageData} />;
}
