"use client";

import React from "react";
import Link from "next/link";
import { PDF_TOOLS, getLocalizedTool } from "@/lib/toolsData";
import { useLanguage } from "@/context/LanguageContext";
import {
  Files,
  Scissors,
  Image as ImageIcon,
  Minimize2,
  Shield,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  ServerOff,
  Cpu,
  CheckCircle,
  ExternalLink,
  Calculator,
  RotateCw,
} from "lucide-react";

export default function HomePage() {
  const { lang, t } = useLanguage();

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case "Files":
        return <Files className="w-6 h-6 text-red-400" />;
      case "Scissors":
        return <Scissors className="w-6 h-6 text-rose-400" />;
      case "Image":
        return <ImageIcon className="w-6 h-6 text-amber-400" />;
      case "Minimize2":
        return <Minimize2 className="w-6 h-6 text-emerald-400" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-indigo-400" />;
      case "RotateCw":
        return <RotateCw className="w-6 h-6 text-cyan-400" />;
      default:
        return <Files className="w-6 h-6 text-red-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-5 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold shadow-lg shadow-red-950/20 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t("privacyBadge")}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
          {t("heroTitle1")}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            {t("heroTitleHighlight")}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/merge-pdf"
            className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-sm font-bold shadow-2xl shadow-red-950/60 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>{t("startMerging")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ilovepdf-alternative"
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-2xl text-sm font-semibold transition-all"
          >
            ⚡ {t("vsIlovepdf")}
          </Link>
        </div>
      </section>

      {/* 6 Core PDF Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t("popularTools")}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">{t("toolsAvailable")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PDF_TOOLS.map((tool) => {
            const loc = getLocalizedTool(tool, lang);
            return (
              <Link
                key={tool.id}
                href={tool.path}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/80 transition-all space-y-4 group flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      {getToolIcon(tool.iconName)}
                    </div>
                    {loc.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                        {loc.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {loc.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-red-400 transition-colors">
                  <span>{t("openTool")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3 Pillars of Client-Side Privacy */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/30 border border-slate-800/80 space-y-8 shadow-2xl">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t("pillarsTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t("pillarsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{t("pillar1Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("pillar1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{t("pillar2Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("pillar2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{t("pillar3Title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("pillar3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* PureToolHub Matrix Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-indigo-950/40 border border-red-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t("matrixBadge")}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {t("matrixTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {t("matrixDesc")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://calc.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-amber-600/90 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>CalcHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <a
            href="https://bio.puretoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SnapBio</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <a
            href="https://tool.lehuoliaoyu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-blue-600/90 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>ToolHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </section>
    </div>
  );
}
