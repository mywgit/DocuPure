import { Language } from "./i18n";

export interface ToolItem {
  id: string;
  name: string;
  path: string;
  shortDesc: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  howToSteps: string[];
  features: string[];
  faqs: { question: string; answer: string }[];
  locales: Record<
    Language,
    {
      name: string;
      shortDesc: string;
      badge?: string;
      h1: string;
      howToSteps?: string[];
      features?: string[];
      faqs?: { question: string; answer: string }[];
    }
  >;
}

export const PDF_TOOLS: ToolItem[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    path: "/merge-pdf",
    shortDesc: "Combine multiple PDF files into one single document in your browser with custom page ordering.",
    primaryKeyword: "Merge PDF",
    secondaryKeywords: ["combine pdf files", "merge pdf online free", "pdf joiner", "merge pdf in browser"],
    metaTitle: "Merge PDF Online Free (2026) - Combine Multiple PDF Files 100% In-Browser",
    metaDescription: "Fast, free & private online PDF merger. Combine unlimited PDF documents into one single file directly in your browser. Zero server uploads, 100% private.",
    h1: "Merge PDF Files Online (100% In-Browser Privacy)",
    iconName: "Files",
    badge: "Most Popular",
    popular: true,
    howToSteps: [
      "Select and drag multiple PDF files into the drop zone.",
      "Re-order the files using drag & drop or order buttons to match your desired sequence.",
      "Click 'Merge & Download PDF' to instantly save your combined document."
    ],
    features: [
      "100% Client-side processing using WebAssembly & pdf-lib (0 bytes uploaded to any server).",
      "Unlimited file size and document count with zero daily quotas.",
      "Custom page sorting and instant sub-second local compilation."
    ],
    faqs: [
      {
        question: "Is it safe to merge confidential contracts or bank statements here?",
        answer: "Yes, 100%! Unlike traditional PDF websites that upload your files to remote servers, DocuPure executes all merging logic purely inside your browser memory. Your documents never leave your computer."
      },
      {
        question: "How many PDF files can I merge at once?",
        answer: "There is no arbitrary limit. You can merge 2, 10, or 50+ PDF files simultaneously depending on your device's memory."
      }
    ],
    locales: {
      en: {
        name: "Merge PDF",
        shortDesc: "Combine multiple PDF files into one single document in your browser with custom page ordering.",
        badge: "Most Popular",
        h1: "Merge PDF Files Online (100% In-Browser Privacy)",
      },
      es: {
        name: "Unir PDF",
        shortDesc: "Une múltiples archivos PDF en un solo documento en el navegador sin subir archivos a servidores.",
        badge: "Más Popular",
        h1: "Unir Archivos PDF Online (100% Privado en Navegador)",
      },
      pt: {
        name: "Juntar PDF",
        shortDesc: "Combine vários arquivos PDF em um único documento diretamente no seu navegador.",
        badge: "Mais Popular",
        h1: "Juntar Arquivos PDF Online (100% Local)",
      },
      de: {
        name: "PDF Zusammenfügen",
        shortDesc: "Fügen Sie mehrere PDF-Dateien direkt im Browser zu einem einzigen Dokument zusammen.",
        badge: "Beliebt",
        h1: "PDF-Dateien Online Zusammenfügen (100% Lokal)",
      },
      fr: {
        name: "Fusionner PDF",
        shortDesc: "Combinez plusieurs fichiers PDF en un seul document directement dans votre navigateur.",
        badge: "Populaire",
        h1: "Fusionner des Fichiers PDF en Ligne (100% Privé)",
      },
      ja: {
        name: "PDF 結合",
        shortDesc: "複数のPDFファイルをブラウザ上で素早く1つのファイルに結合。サーバー送信ゼロで完全安全。",
        badge: "一番人気",
        h1: "PDF 結合オンラインツール（100% ローカル完結）",
      },
      zh: {
        name: "PDF 合并工具",
        shortDesc: "在浏览器本地将多个 PDF 文件按自定义顺序极速拼接到一个文件中，0 字节上传云端，商业合同绝对隐私。",
        badge: "最高频热门",
        h1: "在线 PDF 批量合并（100% 浏览器本地内存运算）",
        howToSteps: [
          "将多份需要合并的 PDF 文件拖入上传区域（或点击选择文件）。",
          "通过卡片上的上移/下移按钮灵活调整各份文档的拼接先后顺序。",
          "点击蓝色的“立即合并并下载”按钮，浏览器在本地内存毫秒级生成新文档并自动下载。"
        ],
        features: [
          "基于浏览器底层 WebAssembly 与 pdf-lib 构建，文件 0 字节离开您的电脑内存。",
          "无任何每日使用次数、页数与文件大小限制，彻底告别商业网站付费弹窗。",
          "支持多文件一键拖拽排序与实时体积展示。"
        ],
        faqs: [
          {
            question: "在此合并财务报表或商业合同安全吗？",
            answer: "绝对 100% 安全！传统网站（如 iLovePDF）会将文件上传到他们的云端服务器，而 DocuPure 所有合并计算均在您的浏览器本地沙盒内完成，断网也能正常运行，不存在任何泄密风险。"
          }
        ]
      }
    }
  },
  {
    id: "split-pdf",
    name: "Split & Extract PDF",
    path: "/split-pdf",
    shortDesc: "Extract specific page ranges or split a PDF into separate single-page documents in seconds.",
    primaryKeyword: "Split PDF",
    secondaryKeywords: ["extract pdf pages", "split pdf online", "separate pdf pages free"],
    metaTitle: "Split PDF Online Free (2026) - Extract Specific Pages 100% Locally",
    metaDescription: "Extract specific pages or split PDF documents into single pages instantly in your browser. 100% client-side memory execution, zero cloud upload.",
    h1: "Split PDF & Extract Pages Online",
    iconName: "Scissors",
    badge: "Fast Extract",
    popular: true,
    howToSteps: [
      "Select or drop your PDF document.",
      "Enter desired page ranges (e.g. '1-3, 5, 8-10') or choose 'Split All Pages into Separate Files'.",
      "Click 'Split & Download' to save your extracted PDF files."
    ],
    features: [
      "Flexible page range parser supporting commas and hyphens.",
      "One-click 'Split all pages' with automatic ZIP packaging.",
      "100% local processing with zero wait times."
    ],
    faqs: [
      {
        question: "Can I extract non-consecutive pages from a PDF?",
        answer: "Yes! Simply enter comma-separated numbers like '1, 4, 7-10' and DocuPure will combine those specific pages into your new PDF."
      }
    ],
    locales: {
      en: {
        name: "Split & Extract PDF",
        shortDesc: "Extract specific page ranges or split a PDF into separate single-page documents in seconds.",
        badge: "Fast Extract",
        h1: "Split PDF & Extract Pages Online",
      },
      es: {
        name: "Dividir PDF",
        shortDesc: "Extrae rangos de páginas específicos o divide un PDF en páginas individuales.",
        badge: "Rápido",
        h1: "Dividir PDF y Extraer Páginas Online",
      },
      pt: {
        name: "Dividir PDF",
        shortDesc: "Extraia páginas específicas ou divida um PDF em arquivos individuais rapidamente.",
        badge: "Rápido",
        h1: "Dividir PDF e Extrair Páginas Online",
      },
      de: {
        name: "PDF Teilen",
        shortDesc: "Extrahieren Sie bestimmte Seitenbereiche oder teilen Sie ein PDF in Einzelseiten.",
        badge: "Schnell",
        h1: "PDF Teilen & Seiten Extrahieren",
      },
      fr: {
        name: "Diviser PDF",
        shortDesc: "Extrayez des pages spécifiques ou divisez un PDF en pages individuelles.",
        badge: "Rapide",
        h1: "Diviser et Extraire des Pages PDF",
      },
      ja: {
        name: "PDF 分割",
        shortDesc: "指定したページ範囲の抽出や、PDFを1ページごとの個別ファイルに高速分割。",
        badge: "高速抽出",
        h1: "PDF 分割・ページ抽出オンラインツール",
      },
      zh: {
        name: "PDF 拆分与提取工具",
        shortDesc: "按自定义页码范围提取页面，或一键将多页 PDF 拆分为独立的单页文件并打包下载。",
        badge: "精准提取",
        h1: "在线 PDF 拆分与页面提取（纯前端本地秒切）",
        howToSteps: [
          "上传需要拆分的 PDF 文档，系统将自动读取总页数。",
          "输入需要提取的页码范围（如 '1-3, 5, 8'），或选择“拆分为所有单页”。",
          "点击下载，单份范围生成提取 PDF，多页拆分自动打包为 ZIP 压缩包。"
        ],
        features: [
          "支持逗号分隔与连字符（如 1-5, 8, 12-15）精准范围解析。",
          "支持一键全部单页拆分并自动打包 ZIP，节省逐页另存为时间。",
          "纯本地高速截取，无惧上百页大型文档。"
        ],
        faqs: [
          {
            question: "支持提取不连续的页码吗？",
            answer: "支持！输入如 '1, 3, 5-7' 即可将这些非连续页面提取并自动整合成一份新的连续 PDF 文件。"
          }
        ]
      }
    }
  },
  {
    id: "jpg-to-pdf",
    name: "Images to PDF (JPG / PNG to PDF)",
    path: "/jpg-to-pdf",
    shortDesc: "Convert JPG, PNG, and WebP images into a single professional PDF with custom margins.",
    primaryKeyword: "JPG to PDF",
    secondaryKeywords: ["images to pdf", "png to pdf converter", "convert photos to pdf free"],
    metaTitle: "JPG to PDF Converter Free (2026) - Convert Images to PDF 100% In-Browser",
    metaDescription: "Convert JPG, PNG, and WebP images into high quality PDF documents for free. Adjust margins, page orientation (Portrait/Landscape), and combine in 1 click.",
    h1: "Convert Images to PDF Online (JPG / PNG / WebP)",
    iconName: "Image",
    badge: "1-Click Convert",
    popular: true,
    howToSteps: [
      "Select one or multiple JPG/PNG image files.",
      "Choose page layout options (A4 Portrait, A4 Landscape, or Fit Image).",
      "Click 'Convert & Download PDF' to get your ready-to-print document."
    ],
    features: [
      "Supports JPG, PNG, and WebP image formats.",
      "Standard A4 or auto-fit canvas layout with custom margins.",
      "100% private in-browser image rendering."
    ],
    faqs: [
      {
        question: "Does converting images to PDF reduce image resolution?",
        answer: "No! Images are embedded at their original pixel dimensions into the PDF container without destructive compression."
      }
    ],
    locales: {
      en: {
        name: "Images to PDF",
        shortDesc: "Convert JPG, PNG, and WebP images into a single professional PDF with custom margins.",
        badge: "1-Click Convert",
        h1: "Convert Images to PDF Online (JPG / PNG / WebP)",
      },
      es: {
        name: "Imágenes a PDF",
        shortDesc: "Convierte imágenes JPG, PNG y WebP en un PDF profesional con orientación ajustable.",
        badge: "Rápido",
        h1: "Convertir Imágenes a PDF Online",
      },
      pt: {
        name: "Imagens para PDF",
        shortDesc: "Converta imagens JPG, PNG e WebP em um documento PDF profissional.",
        badge: "Rápido",
        h1: "Converter Imagens em PDF Online",
      },
      de: {
        name: "Bilder zu PDF",
        shortDesc: "Konvertieren Sie JPG-, PNG- und WebP-Bilder in ein professionelles PDF-Dokument.",
        badge: "Beliebt",
        h1: "Bilder in PDF Umwandeln Online",
      },
      fr: {
        name: "Images en PDF",
        shortDesc: "Convertissez des images JPG, PNG et WebP en un document PDF professionnel.",
        badge: "Populaire",
        h1: "Convertir des Images en PDF en Ligne",
      },
      ja: {
        name: "画像から PDF 変換",
        shortDesc: "JPG、PNG、WebP画像を1つのキレイなPDFドキュメントに瞬時に変換。",
        badge: "簡単変換",
        h1: "画像からPDF変換オンライン（JPG / PNG / WebP）",
      },
      zh: {
        name: "图片转 PDF 工具",
        shortDesc: "将 JPG、PNG、WebP 图片一键合成排版为标准 A4 / 自适应 PDF 文档，支持横纵向与边距调节。",
        badge: "一键拼图",
        h1: "在线图片转 PDF 文档（支持 JPG / PNG / WebP 批量合成）",
        howToSteps: [
          "批量选择或拖拽图片（支持发票、扫描件、摄影图）。",
          "选择纸张尺寸（标准 A4 纵向/横向，或按原图比例自适应）。",
          "点击生成，秒级输出可供打印或提交的单份标准 PDF 文档。"
        ],
        features: [
          "无损嵌入图片原始分辨率，杜绝画质模糊与细节丢失。",
          "内置标准 A4 打印居中排版与自定义页边距算法。",
          "纯本地 Canvas 渲染，不消耗手机或电脑上网流量。"
        ],
        faqs: [
          {
            question: "合成后的 PDF 适合打印吗？",
            answer: "非常适合！选择 A4 纵向或横向模式会自动将图片居中并留出标准打印装订边距，高清不失真。"
          }
        ]
      }
    }
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    path: "/compress-pdf",
    shortDesc: "Reduce PDF file size in your browser by optimizing streams and fonts without quality loss.",
    primaryKeyword: "Compress PDF",
    secondaryKeywords: ["reduce pdf size", "compress pdf online free", "shrink pdf file"],
    metaTitle: "Compress PDF Online Free (2026) - Reduce File Size 100% In-Browser",
    metaDescription: "Free in-browser PDF compressor. Reduce PDF file size by up to 75% for email attachments and web upload. 100% private with zero server uploads.",
    h1: "Compress PDF Online (Reduce File Size Locally)",
    iconName: "Minimize2",
    badge: "High Compression",
    popular: true,
    howToSteps: [
      "Select the large PDF file you want to optimize.",
      "DocuPure analyzes the stream objects and compresses them locally in browser memory.",
      "View the reduction percentage and click download to save the lightweight PDF."
    ],
    features: [
      "Object stream compression and removal of redundant metadata.",
      "Real-time file size comparison (Before vs After).",
      "Zero file size limit and unlimited free compressions."
    ],
    faqs: [
      {
        question: "How does in-browser compression work without uploading to a server?",
        answer: "DocuPure parses the internal PDF structure using WebAssembly, rebuilds the cross-reference tables into compressed object streams, and removes duplicate font descriptors purely inside client memory."
      }
    ],
    locales: {
      en: {
        name: "Compress PDF",
        shortDesc: "Reduce PDF file size in your browser by optimizing streams and fonts without quality loss.",
        badge: "High Compression",
        h1: "Compress PDF Online (Reduce File Size Locally)",
      },
      es: {
        name: "Comprimir PDF",
        shortDesc: "Reduce el tamaño de tu archivo PDF en el navegador optimizando flujos de datos.",
        badge: "Comprimir",
        h1: "Comprimir PDF Online Gratis",
      },
      pt: {
        name: "Comprimir PDF",
        shortDesc: "Reduza o tamanho do arquivo PDF no navegador com segurança e rapidez.",
        badge: "Otimizar",
        h1: "Comprimir PDF Online Grátis",
      },
      de: {
        name: "PDF Komprimieren",
        shortDesc: "Verringern Sie die PDF-Dateigröße direkt im Browser ohne Qualitätsverlust.",
        badge: "Kompakt",
        h1: "PDF Komprimieren Online (Lokal)",
      },
      fr: {
        name: "Compresser PDF",
        shortDesc: "Réduisez la taille de vos fichiers PDF directement dans votre navigateur.",
        badge: "Compression",
        h1: "Compresser PDF en Ligne Gratuitement",
      },
      ja: {
        name: "PDF 圧縮",
        shortDesc: "ブラウザ上でPDFのオブジェクトストリームを最適化し、ファイルサイズを安全に軽量化。",
        badge: "高圧縮",
        h1: "PDF 圧縮オンラインツール（容量削減）",
      },
      zh: {
        name: "PDF 压缩与瘦身工具",
        shortDesc: "在浏览器本地通过对象流重构与冗余元数据清理，大幅缩减 PDF 文件体积，便于邮件附件与网页上传。",
        badge: "高效瘦身",
        h1: "在线 PDF 压缩优化（浏览器纯本地瘦身）",
        howToSteps: [
          "选择体积过大需要压缩的 PDF 文件（支持大文件）。",
          "系统在浏览器内存中自动执行对象流压缩与字体冗余剔除。",
          "查看压缩前后体积与节省比例（如 -60%），一键下载轻量化 PDF。"
        ],
        features: [
          "采用标准 Object Streams 压缩协议，保持排版与文字矢量清晰度。",
          "实时展示“压缩前 ➔ 压缩后”直观体积对比与瘦身百分比。",
          "无文件大小上限，即使几十兆的大文件也能在本地秒级重构。"
        ],
        faqs: [
          {
            question: "压缩会破坏 PDF 里的文字清晰度吗？",
            answer: "不会！我们的算法主要重构内部二进制流并剔除重复元数据，所有矢量文字和高分辨率排版 100% 保持清晰锐利。"
          }
        ]
      }
    }
  },
  {
    id: "protect-pdf",
    name: "Protect & Watermark PDF",
    path: "/protect-pdf",
    shortDesc: "Add secure password protection or diagonal text watermarks to your PDF pages 100% in-browser.",
    primaryKeyword: "Protect PDF",
    secondaryKeywords: ["add watermark to pdf", "password protect pdf", "lock pdf online free"],
    metaTitle: "Protect & Watermark PDF (2026) - Add Password & Watermarks 100% Locally",
    metaDescription: "Add password encryption and semi-transparent diagonal watermarks to PDF files directly in your browser. 100% private with zero cloud storage.",
    h1: "Protect & Watermark PDF Online",
    iconName: "Shield",
    badge: "Security",
    popular: false,
    howToSteps: [
      "Upload the PDF document you want to secure.",
      "Type your desired watermark text (e.g. 'CONFIDENTIAL' or 'DRAFT') and adjust opacity.",
      "Click 'Apply & Download' to save your branded and protected PDF."
    ],
    features: [
      "45-degree diagonal semi-transparent vector watermark overlay on all pages.",
      "Clean vector text rendering that cannot be easily stripped by basic readers.",
      "100% client-side execution protecting confidential IP."
    ],
    faqs: [
      {
        question: "Can anyone remove the watermark added by DocuPure?",
        answer: "The watermark is permanently drawn directly onto the PDF graphics layer as native vector text, making it permanent across standard PDF viewers."
      }
    ],
    locales: {
      en: {
        name: "Protect & Watermark PDF",
        shortDesc: "Add secure password protection or diagonal text watermarks to your PDF pages 100% in-browser.",
        badge: "Security",
        h1: "Protect & Watermark PDF Online",
      },
      es: {
        name: "Proteger y Marcar PDF",
        shortDesc: "Añade marcas de agua de texto en diagonal o protección a tus páginas PDF.",
        badge: "Seguridad",
        h1: "Proteger PDF con Marca de Agua",
      },
      pt: {
        name: "Proteger e Marcar PDF",
        shortDesc: "Adicione marcas d'água em diagonal e proteção aos seus arquivos PDF.",
        badge: "Segurança",
        h1: "Proteger PDF e Adicionar Marca d'Água",
      },
      de: {
        name: "PDF Schützen & Wasserzeichen",
        shortDesc: "Fügen Sie diagonale Text-Wasserzeichen und Schutz zu Ihren PDF-Seiten hinzu.",
        badge: "Sicherheit",
        h1: "PDF Schützen mit Wasserzeichen",
      },
      fr: {
        name: "Protéger et Filigraner PDF",
        shortDesc: "Ajoutez des filigranes de texte en diagonale pour protéger vos documents PDF.",
        badge: "Sécurité",
        h1: "Filigraner et Protéger un PDF",
      },
      ja: {
        name: "PDF 保護・透かし追加",
        shortDesc: "機密文書や社内資料に斜めテキストの透かし（ウォーターマーク）を瞬時に付与。",
        badge: "セキュリティ",
        h1: "PDF 透かし追加・保護オンラインツール",
      },
      zh: {
        name: "PDF 加水印与版权保护",
        shortDesc: "在 PDF 每一页倾斜覆盖半透明文字水印（如'机密文件'、'内部资料'），防止商业泄密与侵权转录。",
        badge: "防伪护航",
        h1: "在线 PDF 批量添加文字水印（纯前端版权保护）",
        howToSteps: [
          "选择需要保护的合同、教材或商业策划 PDF 文件。",
          "输入自定义水印文字（例如 'CONFIDENTIAL'、'仅供审阅'、'公司保密'）。",
          "点击生成，系统自动在每一页以 45 度倾斜角绘制半透明矢量防伪水印。"
        ],
        features: [
          "原生矢量图形层直接绘制，无法被普通阅读器简单一键选中去除。",
          "支持透明度滑块微调，既清晰防伪又不遮挡正文核心数据阅读。",
          "100% 本地内存执行，绝不留存任何底稿副本。"
        ],
        faqs: [
          {
            question: "加完水印后会影响文档里的文字搜索吗？",
            answer: "不会！水印作为独立的透明渲染层叠加在最顶层，底层原有文字的复制与搜索功能完全不受影响。"
          }
        ]
      }
    }
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    path: "/rotate-pdf",
    shortDesc: "Rotate PDF pages 90, 180, or 270 degrees clockwise or counterclockwise in your browser permanently.",
    primaryKeyword: "Rotate PDF",
    secondaryKeywords: ["rotate pdf online free", "turn pdf pages", "fix upside down pdf", "rotate pdf permanently"],
    metaTitle: "Rotate PDF Online Free (2026) - Rotate PDF Pages 90° 180° In-Browser",
    metaDescription: "Permanently rotate PDF pages clockwise or counterclockwise. Fix upside-down scans and landscape layouts 100% in your browser without uploading.",
    h1: "Rotate PDF Pages Online (100% In-Browser Privacy)",
    iconName: "RotateCw",
    badge: "Orientation",
    popular: true,
    howToSteps: [
      "Upload the PDF document with misoriented or upside-down pages.",
      "Choose to rotate 90° Right (Clockwise), 180°, or 90° Left (Counterclockwise).",
      "Click 'Rotate & Download' to save the corrected PDF file permanently."
    ],
    features: [
      "Permanent orientation adjustment directly modifying PDF page rotation metadata.",
      "100% in-browser WebAssembly processing with zero server uploads.",
      "Instant sub-second processing for multi-page contracts and scanned files."
    ],
    faqs: [
      {
        question: "Is the rotation permanent when opening in Adobe or Chrome?",
        answer: "Yes! DocuPure writes standard PDF /Rotate attributes into the document tree so every PDF reader displays the corrected orientation permanently."
      },
      {
        question: "Does rotating degrade document or scan quality?",
        answer: "Not at all! Page rotation in DocuPure is a lossless metadata operation that doesn't re-compress images or alter vector text quality."
      }
    ],
    locales: {
      en: {
        name: "Rotate PDF",
        shortDesc: "Rotate PDF pages 90, 180, or 270 degrees clockwise or counterclockwise in your browser permanently.",
        badge: "Orientation",
        h1: "Rotate PDF Pages Online (100% In-Browser Privacy)",
      },
      es: {
        name: "Girar PDF",
        shortDesc: "Gira las páginas de tu PDF 90, 180 o 270 grados en el navegador de forma permanente.",
        badge: "Orientación",
        h1: "Girar Páginas PDF Online",
      },
      pt: {
        name: "Girar PDF",
        shortDesc: "Gire páginas do seu PDF em 90°, 180° ou 270° diretamente no navegador.",
        badge: "Orientação",
        h1: "Girar Arquivos PDF Online",
      },
      de: {
        name: "PDF Drehen",
        shortDesc: "Drehen Sie PDF-Seiten um 90, 180 oder 270 Grad dauerhaft direkt im Browser.",
        badge: "Ausrichtung",
        h1: "PDF-Seiten Online Drehen",
      },
      fr: {
        name: "Faire Pivoter PDF",
        shortDesc: "Faites pivoter vos pages PDF de 90, 180 ou 270 degrés directement dans votre navigateur.",
        badge: "Orientation",
        h1: "Faire Pivoter un PDF en Ligne",
      },
      ja: {
        name: "PDF 回転",
        shortDesc: "PDFのページを右・左に90度/180度回転して永久保存。逆さまのスキャン文書も瞬時に修正。",
        badge: "向き補正",
        h1: "PDF ページ回転・向き修正オンラインツール",
      },
      zh: {
        name: "PDF 旋转与纠偏工具",
        shortDesc: "一键将 PDF 顺时针/逆时针旋转 90度、180度或 270度，永久纠正倒置或横向排版的扫描件。",
        badge: "页面纠偏",
        h1: "在线 PDF 批量旋转纠偏（纯前端永久保存方向）",
        howToSteps: [
          "上传方向颠倒或需横纵向调整的 PDF 文件。",
          "选择顺时针旋转 90°、逆时针旋转 90° 或颠倒 180°。",
          "点击立即旋转并下载，方向纠偏将永久生效并写入 PDF 标准属性中。"
        ],
        features: [
          "物理写入 PDF 标准 /Rotate 页面属性，在任何阅读器和打印机中永久生效。",
          "纯无损无缝旋转：不破坏任何文字矢量结构与高清扫描分辨率。",
          "100% 浏览器沙盒内存运行，0 字节上传云端。"
        ],
        faqs: [
          {
            question: "旋转后的 PDF 在其他电脑或手机上看也是正的吗？",
            answer: "是的！DocuPure 将旋转角度直接固化在 PDF 的全局页面描述字典中，在微信、浏览器、Adobe Acrobat、手机等任何终端打开都会保持纠正后的正确方向。"
          },
          {
            question: "旋转会降低文档清晰度吗？",
            answer: "完全不会！这属于无损坐标系旋转操作，不经过有损重编码，100% 保持原本的高清画质。"
          }
        ]
      }
    }
  }
];

export function getToolById(id: string): ToolItem | undefined {
  return PDF_TOOLS.find((t) => t.id === id);
}

export function getLocalizedTool(tool: ToolItem, lang: Language) {
  const loc = tool.locales[lang] || tool.locales.en;
  return {
    ...tool,
    name: loc.name,
    shortDesc: loc.shortDesc,
    badge: loc.badge || tool.badge,
    h1: loc.h1,
    howToSteps: loc.howToSteps || tool.howToSteps,
    features: loc.features || tool.features,
    faqs: loc.faqs || tool.faqs,
  };
}
