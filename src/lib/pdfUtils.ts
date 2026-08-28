import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import JSZip from "jszip";

/**
 * 1. Merge multiple PDF files in client memory
 */
export async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * 2. Split PDF by page ranges or extract all pages
 * pageRangeStr format: "1-3, 5, 7-10" or "all"
 */
export async function splitPdfFile(
  file: File,
  pageRangeStr: string
): Promise<{ filename: string; bytes: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();

  if (pageRangeStr.trim().toLowerCase() === "all") {
    // Split into individual single-page PDFs
    const results: { filename: string; bytes: Uint8Array }[] = [];
    const baseName = file.name.replace(/\.[^/.]+$/, "");

    for (let i = 0; i < totalPages; i++) {
      const singleDoc = await PDFDocument.create();
      const [copiedPage] = await singleDoc.copyPages(srcDoc, [i]);
      singleDoc.addPage(copiedPage);
      const bytes = await singleDoc.save();
      results.push({
        filename: `${baseName}_page_${i + 1}.pdf`,
        bytes,
      });
    }
    return results;
  }

  // Parse ranges like "1-3, 5, 8"
  const selectedIndices = new Set<number>();
  const parts = pageRangeStr.split(",");

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let p = Math.max(1, start); p <= Math.min(totalPages, end); p++) {
          selectedIndices.add(p - 1); // 0-indexed
        }
      }
    } else {
      const p = parseInt(trimmed, 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) {
        selectedIndices.add(p - 1);
      }
    }
  }

  if (selectedIndices.size === 0) {
    throw new Error("No valid page numbers or ranges selected.");
  }

  const extractedDoc = await PDFDocument.create();
  const sortedIndices = Array.from(selectedIndices).sort((a, b) => a - b);
  const copiedPages = await extractedDoc.copyPages(srcDoc, sortedIndices);
  copiedPages.forEach((page) => extractedDoc.addPage(page));

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const bytes = await extractedDoc.save();

  return [
    {
      filename: `${baseName}_extracted.pdf`,
      bytes,
    },
  ];
}

/**
 * 3. Convert JPG/PNG Images to a single PDF Document
 */
export async function imagesToPdf(
  imageFiles: File[],
  options: {
    pageSize: "a4" | "fit";
    orientation: "portrait" | "landscape";
    margin: number;
  }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // A4 standard points: 595.28 x 841.89
  const a4Width = options.orientation === "landscape" ? 841.89 : 595.28;
  const a4Height = options.orientation === "landscape" ? 595.28 : 841.89;

  for (const file of imageFiles) {
    const buffer = await file.arrayBuffer();
    let image;
    if (file.type === "image/png") {
      image = await pdfDoc.embedPng(buffer);
    } else {
      image = await pdfDoc.embedJpg(buffer);
    }

    if (options.pageSize === "fit") {
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    } else {
      // Fit within A4 margins
      const page = pdfDoc.addPage([a4Width, a4Height]);
      const availWidth = a4Width - options.margin * 2;
      const availHeight = a4Height - options.margin * 2;

      const scale = Math.min(availWidth / image.width, availHeight / image.height, 1);
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;

      const x = (a4Width - scaledWidth) / 2;
      const y = (a4Height - scaledHeight) / 2;

      page.drawImage(image, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * 4. In-Browser Compress / Optimize PDF
 */
export async function compressPdf(file: File): Promise<{
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  bytes: Uint8Array;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Re-save with object stream compression & metadata clean
  const compressedBytes = await srcDoc.save({
    useObjectStreams: true,
  });

  const originalSize = file.size;
  const compressedSize = compressedBytes.length;
  const reductionPercentage = Math.max(
    0,
    Math.round(((originalSize - compressedSize) / originalSize) * 100)
  );

  return {
    originalSize,
    compressedSize,
    reductionPercentage,
    bytes: compressedBytes,
  };
}

/**
 * 5. Protect with Watermark & Security Metadata
 */
export async function watermarkPdf(
  file: File,
  watermarkText: string,
  opacity: number = 0.25
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textSize = Math.min(width, height) / 10;
    const textWidth = font.widthOfTextAtSize(watermarkText, textSize);

    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: textSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(45),
    });
  }

  return await pdfDoc.save();
}

/**
 * 6. Helper: Trigger Browser File Download
 */
export function downloadBlob(bytes: Uint8Array, filename: string, mimeType: string = "application/pdf") {
  const blob = new Blob([bytes as any], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 7. Helper: Package multiple files into ZIP
 */
export async function downloadFilesAsZip(
  files: { filename: string; bytes: Uint8Array }[],
  zipName: string
) {
  const zip = new JSZip();
  files.forEach((f) => {
    zip.file(f.filename, f.bytes);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
