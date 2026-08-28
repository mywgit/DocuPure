import React from "react";
import { Metadata } from "next";
import { getToolById } from "@/lib/toolsData";
import { PdfToolLayout } from "@/components/PdfToolLayout";
import { MergePdfTool } from "@/components/tools/MergePdfTool";

const tool = getToolById("merge-pdf")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: {
    canonical: `https://pdf.puretoolhub.com${tool.path}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://pdf.puretoolhub.com${tool.path}`,
    siteName: "DocuPure",
  },
};

export default function MergePdfPage() {
  return (
    <PdfToolLayout tool={tool}>
      <MergePdfTool />
    </PdfToolLayout>
  );
}
