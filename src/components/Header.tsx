"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Globe, ChevronDown, Mail, Sparkles, ExternalLink, Zap, Files, Scissors, Image, Minimize2, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";
import { PDF_TOOLS } from "@/lib/toolsData";
import { usePathname } from "next/navigation";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-600/25 group-hover:scale-105 transition-transform border border-white/20">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white text-base tracking-tight flex items-center gap-1.5">
              Docu<span className="bg-gradient-to-r from-red-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">Pure</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
                100% FREE
              </span>
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">{t("siteTagline")}</span>
          </div>
        </Link>

        {/* Center Nav: Core Tools */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/merge-pdf"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/merge-pdf"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("navMerge")}
          </Link>
          <Link
            href="/split-pdf"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/split-pdf"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("navSplit")}
          </Link>
          <Link
            href="/jpg-to-pdf"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/jpg-to-pdf"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("navJpgToPdf")}
          </Link>
          <Link
            href="/compress-pdf"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/compress-pdf"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("navCompress")}
          </Link>
          <Link
            href="/protect-pdf"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/protect-pdf"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("navProtect")}
          </Link>
          <Link
            href="/ilovepdf-alternative"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pathname.includes("alternative")
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            ⚡ {t("vsIlovepdf")}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Official Support */}
          <a
            href="mailto:support@puretoolhub.com"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            title="Official Support"
          >
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>{t("support")}</span>
          </a>

          {/* PureToolHub Cross-Link Badge */}
          <a
            href="https://bio.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>SnapBio</span>
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>{LANGUAGES.find((l) => l.code === lang)?.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 py-1.5 backdrop-blur-xl">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                        lang === item.code ? "text-red-400 font-bold bg-red-500/10" : "text-slate-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.code && <span className="text-[10px] text-red-400">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
