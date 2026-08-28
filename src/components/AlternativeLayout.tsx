"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlternativePage } from "@/lib/alternativeData";
import { ShieldCheck, Check, X, ArrowRight, Zap, Sparkles, ChevronDown, ChevronUp, Lock, Shield, Infinity as InfinityIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AlternativeLayout({ page }: { page: AlternativePage }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{page.heroBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {page.heroTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {page.heroSubtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/merge-pdf"
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl shadow-red-950/50 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Start Merging PDF Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/compress-pdf"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-2xl text-xs sm:text-sm font-bold transition-colors"
          >
            <span>Compress PDF</span>
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center tracking-tight">
          Feature Comparison: DocuPure vs {page.competitorName}
        </h2>
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 text-red-400 bg-red-500/5">DocuPure (Us)</th>
                  <th className="p-4 sm:p-5 text-slate-400">{page.competitorName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {page.comparisonTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      row.highlight ? "bg-red-500/[0.02]" : ""
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-bold text-red-300 bg-red-500/5">
                      {row.docupure}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch Cards */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center tracking-tight">
          Why Thousands of Users Switch to DocuPure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {page.whySwitchReasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3 shadow-xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{reason.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-200 hover:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/30 border border-red-500/30 text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-white">Experience 100% In-Browser PDF Freedom Today</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          No sign-ups, no credit cards, and zero file uploads. Merge, compress, and edit PDF documents locally in seconds.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-red-950/50 hover:scale-105 transition-all"
        >
          <span>Explore All 6 Free Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
