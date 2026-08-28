"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { compressPdf, downloadBlob } from "@/lib/pdfUtils";
import { Minimize2, FileText, Download, CheckCircle, AlertCircle, Sparkles, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PDFDocument, rgb } from "pdf-lib";

export function CompressPdfTool() {
  const { t, lang } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
    reductionPercentage: number;
    bytes: Uint8Array;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setErrorMsg(null);
    setFile(selected);
    setResult(null);
  };

  const handleCompress = async () => {
    if (!file) {
      setErrorMsg("Please upload a PDF file first.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);
      const res = await compressPdf(file);
      setResult(res);
      downloadBlob(res.bytes, `DocuPure_Compressed_${file.name}`);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to compress PDF. File may already be highly optimized.");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleDoc = async () => {
    try {
      const doc = await PDFDocument.create();
      for (let i = 1; i <= 3; i++) {
        const page = doc.addPage([600, 800]);
        page.drawText(`DocuPure Compress Sample Document - Page ${i}`, {
          x: 50,
          y: 700,
          size: 22,
          color: rgb(0.8, 0.2, 0.3),
        });
      }
      const bytes = await doc.save();
      const sampleFile = new File([bytes as any], "Heavy_Sample_Report.pdf", {
        type: "application/pdf",
      });
      handleFileSelected([sampleFile]);
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () => {
    setFile(null);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Minimize2 className="w-4 h-4 text-red-400" />
          <span>{lang === "zh" ? "上传 PDF 并执行本地流压缩" : "Upload PDF to Reduce File Size"}</span>
        </span>
        <button
          onClick={loadSampleDoc}
          className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === "zh" ? "载入测试示例文档" : "Try Sample PDF"}</span>
        </button>
      </div>

      {!file ? (
        <DropZone
          onFilesSelected={handleFileSelected}
          multiple={false}
          label={lang === "zh" ? "将需要压缩的 PDF 文件拖拽至此处，或" : "Drag & drop your PDF file to compress, or"}
          sublabel={lang === "zh" ? "100% 浏览器本地流对象重构，快速瘦身适合邮件附件与网页上传。" : "100% in-browser stream optimization. Perfect for email attachments."}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{file.name}</h4>
                <p className="text-xs text-slate-400 font-mono">
                  {lang === "zh"
                    ? `原始体积: ${(file.size / 1024 / 1024).toFixed(2)} MB (${(file.size / 1024).toFixed(0)} KB)`
                    : `Original Size: ${(file.size / 1024 / 1024).toFixed(2)} MB (${(file.size / 1024).toFixed(0)} KB)`}
                </p>
              </div>
            </div>
            <button
              onClick={clear}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              {lang === "zh" ? "更换文件" : "Change File"}
            </button>
          </div>

          {/* Compression Level Feature Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <TrendingDown className="w-4 h-4" />
              <span>{lang === "zh" ? "智能本地无损流压缩" : "Smart In-Browser Lossless Compression"}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "zh"
                ? "DocuPure 在本地重新编码对象流、清除冗余未引用字体与元数据，保持 100% 矢量文字清晰锐利。"
                : "DocuPure recompresses object streams, removes unreferenced fonts, and compacts cross-reference tables while preserving 100% vector text sharpness."}
            </p>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleCompress}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl transition-all ${
              isProcessing
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/50 hover:scale-[1.01]"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>{t("processing")}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{lang === "zh" ? "立即压缩并下载轻量化 PDF" : "Compress & Download Lightweight PDF"}</span>
              </>
            )}
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {result && (
        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span>{lang === "zh" ? "压缩完毕并已自动下载！" : "Compression Complete & Downloaded!"}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              {lang === "zh" ? `瘦身 ${result.reductionPercentage}%` : `Saved ${result.reductionPercentage}%`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 font-mono">
            <div>
              <span className="text-slate-500 block">{lang === "zh" ? "压缩前体积：" : "Original Size:"}</span>
              <span className="text-slate-300 font-bold">
                {(result.originalSize / 1024).toFixed(1)} KB
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{lang === "zh" ? "压缩后体积：" : "Compressed Size:"}</span>
              <span className="text-emerald-400 font-bold">
                {(result.compressedSize / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
