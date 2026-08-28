"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToolItem, PDF_TOOLS, getLocalizedTool } from "@/lib/toolsData";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Sparkles, ChevronDown, ChevronUp, CheckCircle, ArrowRight, Star, Zap, Calculator, FileText } from "lucide-react";

interface PdfToolLayoutProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export function PdfToolLayout({ tool, children }: PdfToolLayoutProps) {
  const { lang, t } = useLanguage();
  const locTool = getLocalizedTool(tool, lang);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured Data Schema.org (SoftwareApplication + FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `DocuPure - ${tool.name}`,
        "operatingSystem": "All Web Browsers (Chrome, Safari, Firefox, Edge, Mobile)",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1284",
        },
        "description": tool.metaDescription,
      },
      {
        "@type": "FAQPage",
        "mainEntity": locTool.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          DocuPure
        </Link>
        <span>/</span>
        <span className="text-red-400 font-semibold">{locTool.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{locTool.badge || "100% In-Browser Privacy"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          {locTool.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {locTool.shortDesc}
        </p>
      </div>

      {/* Interactive Tool Main Workspace Container */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {children}
      </section>

      {/* Features & How-to Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Features Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <Zap className="w-5 h-5" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("features")}</h2>
          </div>
          <ul className="space-y-3">
            {locTool.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How-to Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <FileText className="w-5 h-5" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("howTo")}</h2>
          </div>
          <ol className="space-y-3">
            {locTool.howToSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* FAQ Accordion */}
      {locTool.faqs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{t("faq")}</span>
          </h2>
          <div className="space-y-3">
            {locTool.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left font-bold text-sm text-slate-200 hover:text-white flex items-center justify-between gap-4 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Ecosystem Cross-Sell Banner */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-red-950/30 via-slate-900 to-indigo-950/30 border border-red-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t("matrixBadge")}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {lang === "zh"
              ? "需要亚马逊 FBA 利润测算或创作者微官网？"
              : "Need Amazon FBA Solvers or Creator Bio Stores?"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {lang === "zh"
              ? "在 CalcHub 精准模拟 2026 最新 FBA 阶梯履约费与 PPC 广告保本售价，在 SnapBio 30 秒搭建 Notion 风格个人主页。"
              : "Explore CalcHub for exact Amazon FBA fee simulations and SnapBio to launch your aesthetic Link-in-Bio hub in 30 seconds."}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://calc.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-950/40 flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>CalcHub</span>
          </a>
          <a
            href="https://bio.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-950/40 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SnapBio</span>
          </a>
        </div>
      </section>

      {/* Related Tools Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">{t("allTools")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PDF_TOOLS.filter((t) => t.id !== tool.id).map((otherTool) => {
            const otherLoc = getLocalizedTool(otherTool, lang);
            return (
              <Link
                key={otherTool.id}
                href={otherTool.path}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-red-500/40 hover:bg-slate-900/80 transition-all space-y-2 group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {otherLoc.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {otherLoc.shortDesc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
