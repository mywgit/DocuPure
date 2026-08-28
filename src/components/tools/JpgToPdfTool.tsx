"use client";

import React, { useState } from "react";
import { DropZone } from "@/components/DropZone";
import { imagesToPdf, downloadBlob } from "@/lib/pdfUtils";
import { Image as ImageIcon, Download, CheckCircle, AlertCircle, Sparkles, Trash2, Sliders } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

export function JpgToPdfTool() {
  const { t, lang } = useLanguage();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImagesSelected = (newFiles: File[]) => {
    const valid = newFiles.filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) {
      setErrorMsg("Please select valid image files (JPG, PNG, WebP).");
      return;
    }
    setErrorMsg(null);
    const mapped: ImageItem[] = valid.map((f) => ({
      id: Math.random().toString(36).substring(7),
      file: f,
      previewUrl: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
    }));
    setImages((prev) => [...prev, ...mapped]);
    setDownloadSuccess(false);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setImages([]);
    setDownloadSuccess(false);
    setErrorMsg(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setErrorMsg("Please add at least one image.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);
      const pdfBytes = await imagesToPdf(
        images.map((i) => i.file),
        { pageSize, orientation, margin }
      );
      downloadBlob(pdfBytes, "DocuPure_Images.pdf");
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to convert images to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSampleImages = () => {
    // Generate two sample 1x1 colored PNGs via canvas
    const createSampleFile = (color: string, name: string): File => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(name, 50, 150);

      const dataUrl = canvas.toDataURL("image/png");
      const byteString = atob(dataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new File([ab], `${name}.png`, { type: "image/png" });
    };

    const f1 = createSampleFile("#dc2626", "Invoice_Receipt_1");
    const f2 = createSampleFile("#2563eb", "Scanned_ID_Card_2");
    handleImagesSelected([f1, f2]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-red-400" />
          <span>{lang === "zh" ? "上传图片并配置 PDF 纸张排版" : "Upload Images & Configure PDF Page Setup"}</span>
        </span>
        <button
          onClick={loadSampleImages}
          className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-semibold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === "zh" ? "载入测试图片示例" : "Try Sample Images"}</span>
        </button>
      </div>

      <DropZone
        onFilesSelected={handleImagesSelected}
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        label={lang === "zh" ? "将 JPG、PNG 或 WebP 图片拖拽至此处，或" : "Drag & drop JPG, PNG, or WebP images, or"}
        sublabel={lang === "zh" ? "选择多张照片批量合成排版为单份 PDF 文档。" : "Select multiple photos to combine into a single PDF document."}
      />

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          {/* Options Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === "zh" ? "纸张尺寸：" : "Page Size:"}</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="a4">{lang === "zh" ? "标准 A4 页面 (居中自适应)" : "Standard A4 (Fit to Page)"}</option>
                <option value="fit">{lang === "zh" ? "原图尺寸 (1:1 像素嵌入)" : "Original Image Size (Auto Fit)"}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === "zh" ? "页面方向：" : "Orientation:"}</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="portrait">{lang === "zh" ? "纵向 (Portrait)" : "Portrait (Vertical)"}</option>
                <option value="landscape">{lang === "zh" ? "横向 (Landscape)" : "Landscape (Horizontal)"}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === "zh" ? "页边距：" : "Margin:"}</label>
              <select
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value={0}>{lang === "zh" ? "无边距 (铺满整个页面)" : "No Margin (Border to Border)"}</option>
                <option value={20}>{lang === "zh" ? "标准边距 (20pt 打印留白)" : "Small Margin (20pt)"}</option>
                <option value={40}>{lang === "zh" ? "宽边距 (40pt 装订留白)" : "Wide Margin (40pt)"}</option>
              </select>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {lang === "zh"
                  ? `已选择 ${images.length} 张图片`
                  : `Selected ${images.length} photo${images.length > 1 ? "s" : ""}`}
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                {t("reset")}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden aspect-square flex items-center justify-center p-1"
                >
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                    #{idx + 1}
                  </div>
                  <button
                    onClick={() => removeImage(item.id)}
                    className="absolute top-1 right-1 p-1 rounded bg-rose-600/80 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleConvert}
            disabled={isProcessing || images.length === 0}
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
                  {lang === "zh"
                    ? `将 ${images.length} 张图片合成并生成 PDF 文档`
                    : `Convert ${images.length} Images to PDF Document`}
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{lang === "zh" ? "转换成功！高清 PDF 文档已下载至您的设备。" : "Success! Combined PDF document has been created and downloaded."}</span>
          </div>
          <button onClick={clearAll} className="underline text-emerald-300 font-bold">
            {lang === "zh" ? "转换更多图片" : "Convert More"}
          </button>
        </div>
      )}
    </div>
  );
}
