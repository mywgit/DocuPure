"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  label?: string;
  sublabel?: string;
}

export function DropZone({
  onFilesSelected,
  accept = "application/pdf,.pdf",
  multiple = true,
  maxFiles = 50,
  label,
  sublabel,
}: DropZoneProps) {
  const { t, lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      onFilesSelected(dropped);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files).slice(0, maxFiles);
      onFilesSelected(selected);
      // Reset input value so same files can be re-selected if cleared
      e.target.value = "";
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center group flex flex-col items-center justify-center gap-4 ${
        isDragging
          ? "border-red-500 bg-red-500/10 scale-[1.01]"
          : "border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-red-500/50 shadow-xl"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shadow-lg shadow-red-950/30">
        <UploadCloud className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <p className="text-base sm:text-lg font-bold text-white">
          {label || t("dropFilesHere")}{" "}
          <span className="text-red-400 underline underline-offset-4 font-extrabold group-hover:text-red-300">
            {t("browseFiles")}
          </span>
        </p>
        <p className="text-xs text-slate-400">
          {sublabel ||
            (lang === "zh"
              ? "文件 100% 在您的浏览器沙盒内存中运算，0 字节上传远程服务器。"
              : "Files stay 100% in your browser memory. 0 bytes uploaded to remote servers.")}
        </p>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-medium text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{t("privacyBadge")}</span>
      </div>
    </div>
  );
}
