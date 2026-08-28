"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { splitPdfFile, downloadBlob, downloadFilesAsZip } from "@/lib/pdfUtils";
import { Scissors, FileText, Download, CheckCircle, AlertCircle, Sparkles, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PDFDocument, rgb } from "pdf-lib";

export function SplitPdfTool() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"range" | "all">("range");
  const [pageRange, setPageRange] = useState("1-2");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    try {
      setErrorMsg(null);
      setFile(selected);
      const buffer = await selected.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setPageCount(count);
      setPageRange(count > 1 ? `1-${Math.min(2, count)}` : "1");
      setDownloadSuccess(false);
    } catch (e: any) {
      setErrorMsg("Failed to read PDF pages. Ensure the file is not password protected.");
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setErrorMsg("Please upload a PDF file first.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);

      if (mode === "all") {
        const results = await splitPdfFile(file, "all");
        await downloadFilesAsZip(results, `${file.name.replace(/\.[^/.]+$/, "")}_all_pages.zip`);
      } else {
        const results = await splitPdfFile(file, pageRange);
        if (results.length > 0) {
          downloadBlob(results[0].bytes, results[0].filename);
        }
      }
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to split PDF. Check your page range syntax.");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleDoc = async () => {
    try {
      const doc = await PDFDocument.create();
      for (let i = 1; i <= 5; i++) {
        const page = doc.addPage([500, 400]);
        page.drawText(`DocuPure Multi-Page Sample - Page ${i} of 5`, {
          x: 50,
          y: 300,
          size: 18,
          color: rgb(0.2, 0.4, 0.7),
        });
      }
      const bytes = await doc.save();
      const sampleFile = new File([bytes as any], "Sample_5_Pages_Report.pdf", {
        type: "application/pdf",
      });
      handleFileSelected([sampleFile]);
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () => {
    setFile(null);
    setPageCount(null);
    setDownloadSuccess(false);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Scissors className="w-4 h-4 text-red-400" />
          <span>Upload PDF & Define Extract Range</span>
        </span>
        <button
          onClick={loadSampleDoc}
          className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Try 5-Page Sample</span>
        </button>
      </div>

      {!file ? (
        <DropZone
          onFilesSelected={handleFileSelected}
          multiple={false}
          label="Drag & drop your PDF file to split, or"
          sublabel="Select a document. We will analyze page numbers locally."
        />
      ) : (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          {/* File summary header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{file.name}</h4>
                <p className="text-xs text-slate-400">
                  Total {pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clear}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Change File
            </button>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              onClick={() => setMode("range")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                mode === "range"
                  ? "bg-red-500/10 border-red-500/50 shadow-md shadow-red-950/30"
                  : "bg-slate-900/60 border-slate-800 hover:bg-slate-900"
              }`}
            >
              <input
                type="radio"
                name="split-mode"
                checked={mode === "range"}
                onChange={() => setMode("range")}
                className="mt-1"
              />
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Extract Custom Page Range</p>
                <p className="text-[11px] text-slate-400">
                  Combine selected pages (e.g. 1-3, 5) into a single extracted PDF.
                </p>
              </div>
            </label>

            <label
              onClick={() => setMode("all")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                mode === "all"
                  ? "bg-red-500/10 border-red-500/50 shadow-md shadow-red-950/30"
                  : "bg-slate-900/60 border-slate-800 hover:bg-slate-900"
              }`}
            >
              <input
                type="radio"
                name="split-mode"
                checked={mode === "all"}
                onChange={() => setMode("all")}
                className="mt-1"
              />
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Split Every Page to Separate File</p>
                <p className="text-[11px] text-slate-400">
                  Export all {pageCount} pages as individual PDFs packaged in a ZIP.
                </p>
              </div>
            </label>
          </div>

          {/* Range input field */}
          {mode === "range" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Page Ranges to Extract:</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Total range: 1 to {pageCount}
                </span>
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. 1-3, 5, 8"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-red-500"
              />
            </div>
          )}

          {/* Trigger Button */}
          <button
            onClick={handleSplit}
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
                <span>
                  {mode === "all" ? `Split ${pageCount} Pages into ZIP` : `Extract Pages (${pageRange})`}
                </span>
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

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Success! Extracted PDF has been saved to your computer.</span>
          </div>
          <button onClick={clear} className="underline text-emerald-300 font-bold">
            Split Another
          </button>
        </div>
      )}
    </div>
  );
}
