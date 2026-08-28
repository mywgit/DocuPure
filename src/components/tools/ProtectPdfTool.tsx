"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { watermarkPdf, downloadBlob } from "@/lib/pdfUtils";
import { Shield, FileText, Download, CheckCircle, AlertCircle, Sparkles, Sliders } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PDFDocument, rgb } from "pdf-lib";

export function ProtectPdfTool() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setErrorMsg(null);
    setFile(selected);
    setDownloadSuccess(false);
  };

  const handleApply = async () => {
    if (!file) {
      setErrorMsg("Please upload a PDF file first.");
      return;
    }
    if (!watermarkText.trim()) {
      setErrorMsg("Please enter watermark text.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);
      const watermarkedBytes = await watermarkPdf(file, watermarkText, opacity);
      downloadBlob(watermarkedBytes, `DocuPure_Watermarked_${file.name}`);
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to apply watermark to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleDoc = async () => {
    try {
      const doc = await PDFDocument.create();
      const page = doc.addPage([500, 400]);
      page.drawText("Project Alpha Strategy Document (2026)", {
        x: 50,
        y: 300,
        size: 18,
        color: rgb(0.1, 0.2, 0.4),
      });
      const bytes = await doc.save();
      const sampleFile = new File([bytes as any], "Strategy_Proposal.pdf", {
        type: "application/pdf",
      });
      handleFileSelected([sampleFile]);
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () => {
    setFile(null);
    setDownloadSuccess(false);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-400" />
          <span>Upload PDF & Add Diagonal Security Watermark</span>
        </span>
        <button
          onClick={loadSampleDoc}
          className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Try Sample Document</span>
        </button>
      </div>

      {!file ? (
        <DropZone
          onFilesSelected={handleFileSelected}
          multiple={false}
          label="Drag & drop your PDF file to watermark, or"
          sublabel="Add diagonal copyright protection text across all pages in 1 click."
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
                  {(file.size / 1024 / 1024).toFixed(2)} MB
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

          {/* Watermark Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Watermark Text:</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-2 pt-1">
                {["CONFIDENTIAL", "DRAFT", "COPY", "DO NOT SHARE"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWatermarkText(preset)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <label>Opacity (Transparency):</label>
                <span className="font-mono text-red-400">{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-red-500 mt-2"
              />
              <p className="text-[11px] text-slate-500">
                Recommended 20% to 30% for high readability without blocking main text.
              </p>
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleApply}
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
                <span>Apply Watermark & Download PDF</span>
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
            <span>Success! Watermarked PDF has been created and saved.</span>
          </div>
          <button onClick={clear} className="underline text-emerald-300 font-bold">
            Protect Another
          </button>
        </div>
      )}
    </div>
  );
}
