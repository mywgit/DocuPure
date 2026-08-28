import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://pdf.puretoolhub.com"),
  title: {
    template: "%s | DocuPure",
    default: "DocuPure - 100% In-Browser Privacy-First PDF Studio (2026)",
  },
  description:
    "Free, fast & unlimited online PDF toolbox. Merge, split, compress, convert images, and protect PDFs 100% in your browser memory. Zero server uploads.",
  keywords: [
    "merge pdf online",
    "split pdf free",
    "compress pdf in browser",
    "jpg to pdf",
    "ilovepdf alternative",
    "smallpdf alternative",
    "privacy first pdf tools",
  ],
  authors: [{ name: "PureToolHub Team", url: "https://puretoolhub.com" }],
  creator: "PureToolHub",
  alternates: {
    canonical: "https://pdf.puretoolhub.com",
    languages: {
      "en-US": "https://pdf.puretoolhub.com",
      "es-ES": "https://pdf.puretoolhub.com",
      "pt-BR": "https://pdf.puretoolhub.com",
      "de-DE": "https://pdf.puretoolhub.com",
      "fr-FR": "https://pdf.puretoolhub.com",
      "ja-JP": "https://pdf.puretoolhub.com",
      "zh-CN": "https://pdf.puretoolhub.com",
      "x-default": "https://pdf.puretoolhub.com",
    },
  },
  openGraph: {
    title: "DocuPure - 100% In-Browser Privacy-First PDF Studio",
    description:
      "Merge, split, compress, and convert PDFs directly in client memory. Zero server uploads and 100% free.",
    url: "https://pdf.puretoolhub.com",
    siteName: "DocuPure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocuPure - In-Browser PDF Studio",
    description: "100% Client-Side PDF Tools. Unlimited & Free with 0 Server Uploads.",
    creator: "@puretoolhub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-red-500/30 selection:text-red-200">
        <LanguageProvider>
          <Analytics />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
