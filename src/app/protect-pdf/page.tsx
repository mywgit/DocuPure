import React from "react";
import { Metadata } from "next";
import { getToolById } from "@/lib/toolsData";
import { PdfToolLayout } from "@/components/PdfToolLayout";
import { ProtectPdfTool } from "@/components/tools/ProtectPdfTool";

const tool = getToolById("protect-pdf")!;

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

export default function ProtectPdfPage() {
  return (
    <PdfToolLayout tool={tool}>
      <ProtectPdfTool />
    </PdfToolLayout>
  );
}
