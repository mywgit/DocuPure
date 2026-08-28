"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { mergePdfFiles, downloadBlob } from "@/lib/pdfUtils";
import { Files, ArrowUp, ArrowDown, Trash2, Download, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export function MergePdfTool() {
  const { t } = useLanguage();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    const pdfOnly = newFiles.filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (pdfOnly.length === 0) {
      setErrorMsg("Please select valid PDF documents.");
      return;
    }
    setErrorMsg(null);
    const mapped: UploadedFile[] = pdfOnly.map((f) => ({
      id: Math.random().toString(36).substring(7),
      file: f,
      name: f.name,
      size: f.size,
    }));
    setFiles((prev) => [...prev, ...mapped]);
    setDownloadSuccess(false);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setDownloadSuccess(false);
    setErrorMsg(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMsg("Please add at least 2 PDF files to merge.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);
      const mergedBytes = await mergePdfFiles(files.map((f) => f.file));
      downloadBlob(mergedBytes, "DocuPure_Merged.pdf");
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to merge PDF files. Please ensure files are not corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleFiles = async () => {
    try {
      // Create two lightweight sample PDFs dynamically in client memory
      const { PDFDocument, rgb } = await import("pdf-lib");

      const doc1 = await PDFDocument.create();
      const page1 = doc1.addPage([500, 400]);
      page1.drawText("DocuPure Sample Document #1", { x: 50, y: 300, size: 20, color: rgb(0.8, 0.2, 0.2) });
      const bytes1 = await doc1.save();
      const file1 = new File([bytes1 as any], "Contract_Part_A.pdf", { type: "application/pdf" });

      const doc2 = await PDFDocument.create();
      const page2 = doc2.addPage([500, 400]);
      page2.drawText("DocuPure Sample Document #2", { x: 50, y: 300, size: 20, color: rgb(0.2, 0.5, 0.8) });
      const bytes2 = await doc2.save();
      const file2 = new File([bytes2 as any], "Appendix_Part_B.pdf", { type: "application/pdf" });

      handleFilesSelected([file1, file2]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Files className="w-4 h-4 text-red-400" />
          <span>Upload & Arrange PDF Sequence</span>
        </span>
        <button
          onClick={loadSampleFiles}
          className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t("trySample")}</span>
        </button>
      </div>

      {/* Drop zone */}
      <DropZone
        onFilesSelected={handleFilesSelected}
        label="Drag & drop PDF files to merge, or"
        sublabel="Select 2 or more PDF files. You can reorder them after uploading."
      />

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300">
              Total {files.length} document{files.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={clearAll}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              {t("reset")}
            </button>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 shadow-md hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {(item.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === files.length - 1}
                    title="Move Down"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    title="Remove"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Merge Trigger Button */}
          <div className="pt-2">
            <button
              onClick={handleMerge}
              disabled={isProcessing || files.length < 2}
              className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl transition-all ${
                isProcessing
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : files.length < 2
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
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
                    Merge {files.length} PDFs & Download (100% Free)
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Success! Combined PDF has been downloaded to your computer.</span>
          </div>
          <button onClick={clearAll} className="underline text-emerald-300 font-bold">
            Merge More
          </button>
        </div>
      )}
    </div>
  );
}
