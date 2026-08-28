"use client";

import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Mail, Heart, ExternalLink, Sparkles, Zap, Calculator } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PDF_TOOLS } from "@/lib/toolsData";

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/30">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                Docu<span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">Pure</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t("footerText")}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("privacyBadge")}</span>
            </div>
          </div>

          {/* Col 2: Core PDF Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t("footerPdfTools")}</h4>
            <ul className="space-y-2">
              {PDF_TOOLS.map((tool) => {
                const loc = tool.locales[lang] || tool.locales.en;
                return (
                  <li key={tool.id}>
                    <Link href={tool.path} className="hover:text-red-400 transition-colors">
                      {loc.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Competitor Comparisons */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t("footerCompetitors")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ilovepdf-alternative" className="hover:text-red-400 transition-colors">
                  {t("vsIlovepdf")}
                </Link>
              </li>
              <li>
                <Link href="/smallpdf-alternative" className="hover:text-red-400 transition-colors">
                  {t("vsSmallpdf")}
                </Link>
              </li>
              <li>
                <Link href="/adobe-acrobat-alternative" className="hover:text-red-400 transition-colors">
                  {t("vsAdobe")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: PureToolHub Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>{t("footerMatrix")}</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://calc.puretoolhub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-amber-400 transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Calculator className="w-3 h-3 text-amber-400" />
                    <span>CalcHub (Amazon FBA & ROI)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://bio.puretoolhub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-indigo-400 transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>SnapBio (Creator Link in Bio)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://tool.lehuoliaoyu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-blue-400 transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span>ToolHub (Developer Tools)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p>{t("footerCopyright")}</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@puretoolhub.com"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>support@puretoolhub.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
