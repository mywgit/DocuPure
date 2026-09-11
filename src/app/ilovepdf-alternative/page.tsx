import React from "react";
import { Metadata } from "next";
import { getAlternativePageBySlug } from "@/lib/alternativeData";
import { AlternativeLayout } from "@/components/AlternativeLayout";

const pageData = getAlternativePageBySlug("ilovepdf-alternative")!;

export const metadata: Metadata = {
  title: pageData.locales.en.metaTitle,
  description: pageData.locales.en.metaDescription,
  keywords: [
    "better than ilovepdf",
    "free alternative to ilovepdf",
    "ilovepdf alternative",
    "open pdf studio",
    "private pdf tools",
    "offline pdf editor",
    "client-side pdf converter",
    "no file size limit pdf",
  ],
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

export default function IlovepdfAlternativePage() {
  return <AlternativeLayout page={pageData} />;
}
