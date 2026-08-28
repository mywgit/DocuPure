"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { rotatePdfPages, downloadBlob } from "@/lib/pdfUtils";
import { RotateCw, RotateCcw, RefreshCw, FileText, Download, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PDFDocument, rgb } from "pdf-lib";

export function RotatePdfTool() {
  const { t, lang } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    const selected = files[0];
    if (selected) {
      if (selected.type !== "application/pdf" && !selected.name.endsWith(".pdf")) {
        setErrorMsg("Please upload a valid PDF document.");
        return;
      }
      setFile(selected);
      setErrorMsg(null);
      setDownloadSuccess(false);
    }
  };

  const loadSampleDoc = async () => {
    try {
      const sampleDoc = await PDFDocument.create();
      const p1 = sampleDoc.addPage([595, 842]);
      p1.drawText("DocuPure Demo Page 1 (Landscape Scan)", {
        x: 60,
        y: 450,
        size: 20,
        color: rgb(0.15, 0.23, 0.36),
      });

      const p2 = sampleDoc.addPage([595, 842]);
      p2.drawText("DocuPure Demo Page 2 (Upside Down Contract)", {
        x: 60,
        y: 450,
        size: 20,
        color: rgb(0.85, 0.15, 0.15),
      });

      const pdfBytes = await sampleDoc.save();
      const sampleFile = new File([pdfBytes as any], "sample_scanned_contract.pdf", {
        type: "application/pdf",
      });
      handleFileSelected([sampleFile]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const rotatedBytes = await rotatePdfPages(file, rotationAngle);
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      downloadBlob(rotatedBytes, `${baseName}_rotated_${rotationAngle}deg.pdf`);
      setDownloadSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to rotate PDF. The file may be corrupt or password-protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clear = () => {
    setFile(null);
    setDownloadSuccess(false);
    setErrorMsg(null);
    setRotationAngle(90);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-cyan-400" />
          <span>{lang === "zh" ? "上传 PDF 并选择旋转纠偏角度" : "Upload PDF & Select Rotation Angle"}</span>
        </span>
        <button
          onClick={loadSampleDoc}
          className="text-xs px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === "zh" ? "载入测试示例文档" : "Try Sample Document"}</span>
        </button>
      </div>

      {!file ? (
        <DropZone
          onFilesSelected={handleFileSelected}
          multiple={false}
          label={lang === "zh" ? "将需要旋转纠偏的 PDF 文件拖拽至此处，或" : "Drag & drop your PDF file to rotate, or"}
          sublabel={lang === "zh" ? "永久性修改 PDF 页面方向元数据，100% 保持原本高清画质。" : "Permanently modify page rotation metadata with 100% original quality."}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
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
              {lang === "zh" ? "更换文件" : "Change File"}
            </button>
          </div>

          {/* Angle Selection Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300">
              {lang === "zh" ? "选择旋转方向与角度：" : "Choose Rotation Direction:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRotationAngle(90)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  rotationAngle === 90
                    ? "bg-cyan-500/10 border-cyan-500/60 text-cyan-300 shadow-lg shadow-cyan-950/40"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900"
                }`}
              >
                <RotateCw className="w-6 h-6 text-cyan-400" />
                <span className="text-xs font-bold">{lang === "zh" ? "顺时针旋转 90° (向右)" : "Rotate Right 90°"}</span>
                <span className="text-[10px] text-slate-500 font-mono">+90° Clockwise</span>
              </button>

              <button
                type="button"
                onClick={() => setRotationAngle(180)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  rotationAngle === 180
                    ? "bg-cyan-500/10 border-cyan-500/60 text-cyan-300 shadow-lg shadow-cyan-950/40"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900"
                }`}
              >
                <RefreshCw className="w-6 h-6 text-amber-400" />
                <span className="text-xs font-bold">{lang === "zh" ? "上下颠倒翻转 180°" : "Flip Upside Down 180°"}</span>
                <span className="text-[10px] text-slate-500 font-mono">180° Inverted</span>
              </button>

              <button
                type="button"
                onClick={() => setRotationAngle(270)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  rotationAngle === 270
                    ? "bg-cyan-500/10 border-cyan-500/60 text-cyan-300 shadow-lg shadow-cyan-950/40"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900"
                }`}
              >
                <RotateCcw className="w-6 h-6 text-rose-400" />
                <span className="text-xs font-bold">{lang === "zh" ? "逆时针旋转 90° (向左)" : "Rotate Left 90°"}</span>
                <span className="text-[10px] text-slate-500 font-mono">+270° Counterclockwise</span>
              </button>
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleRotate}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl transition-all ${
              isProcessing
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-950/50 hover:scale-[1.01]"
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
                  {lang === "zh"
                    ? `立即旋转 ${rotationAngle}° 并下载 PDF`
                    : `Rotate ${rotationAngle}° & Download PDF`}
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
            <span>{lang === "zh" ? "旋转成功！纠偏后的 PDF 文档已下载。" : "Success! Corrected PDF has been saved to your computer."}</span>
          </div>
          <button onClick={clear} className="underline text-emerald-300 font-bold">
            {lang === "zh" ? "旋转其他文件" : "Rotate Another"}
          </button>
        </div>
      )}
    </div>
  );
}
