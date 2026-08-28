import { Language } from "./i18n";

export interface AlternativeLocaleContent {
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  comparisonTable: {
    feature: string;
    docupure: string;
    competitor: string;
    highlight?: boolean;
  }[];
  whySwitchReasons: {
    title: string;
    desc: string;
    iconName: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface AlternativePage {
  slug: string;
  competitorName: string;
  path: string;
  locales: {
    en: AlternativeLocaleContent;
    zh: AlternativeLocaleContent;
    [key: string]: AlternativeLocaleContent;
  };
}

export const ALTERNATIVE_PAGES: AlternativePage[] = [
  {
    slug: "ilovepdf-alternative",
    competitorName: "iLovePDF",
    path: "/ilovepdf-alternative",
    locales: {
      en: {
        metaTitle: "Best Free iLovePDF Alternative (2026) - 100% In-Browser Privacy & No Limits",
        metaDescription: "Looking for an iLovePDF alternative without daily limits or server uploads? DocuPure offers unlimited in-browser PDF merging, splitting, and converting with 100% privacy.",
        heroBadge: "Zero Server Uploads vs iLovePDF",
        heroTitle: "The Privacy-First, Unlimited Free Alternative to iLovePDF",
        heroSubtitle: "Tired of hitting iLovePDF daily free limits and uploading confidential contracts to third-party servers? DocuPure processes all PDF files 100% locally in your browser memory for free.",
        comparisonTable: [
          {
            feature: "File Processing Location",
            docupure: "🔒 100% In-Browser Memory (0 Server Uploads)",
            competitor: "☁️ Uploaded to Remote Cloud Servers",
            highlight: true,
          },
          {
            feature: "Free Daily Usage Limit",
            docupure: "⚡ Unlimited Tasks & Merges",
            competitor: "⚠️ Limited to 2-3 tasks/day before paywall",
            highlight: true,
          },
          {
            feature: "Confidentiality & Privacy",
            docupure: "🛡️ Absolute: Documents never leave your device",
            competitor: "⚠️ Third-party server retention policy",
            highlight: true,
          },
          {
            feature: "Processing Speed",
            docupure: "⚡ Instant Local CPU / WebAssembly Execution",
            competitor: "🐢 Depends on network upload/download queues",
          },
          {
            feature: "Pricing & Subscriptions",
            docupure: "🎉 100% Free Core Tools",
            competitor: "💳 $7.00 / month for Premium",
          },
        ],
        whySwitchReasons: [
          {
            title: "Zero Security Leaks for Financials & Contracts",
            desc: "Lawyers, accountants, and enterprises cannot risk uploading client NDAs or financial statements to remote cloud servers. DocuPure operates 100% client-side.",
            iconName: "ShieldCheck",
          },
          {
            title: "No Daily Caps & No Annoying Countdown Timers",
            desc: "Never get blocked in the middle of urgent work with popups demanding a $7/mo subscription.",
            iconName: "Infinity",
          },
          {
            title: "Instant Sub-Second Execution",
            desc: "No waiting for 20MB files to upload across slow connections. Your computer's local CPU handles rendering in milliseconds.",
            iconName: "Zap",
          },
        ],
        faqs: [
          {
            question: "Why is DocuPure a better alternative to iLovePDF?",
            answer: "DocuPure executes all PDF parsing, merging, splitting, and rendering directly in your browser using modern WebAssembly. Your files are never sent over the internet to remote servers, giving you 100% privacy and unlimited usage for free.",
          },
          {
            question: "Can I use DocuPure offline without an internet connection?",
            answer: "Yes! Once the webpage is loaded in your browser, all PDF algorithms run locally inside your device memory without needing ongoing network connections.",
          },
        ],
      },
      zh: {
        metaTitle: "最佳 iLovePDF 替代方案 (2026) - 100% 浏览器纯本地计算 · 零上传 · 无限次",
        metaDescription: "寻找无需上传服务器且没有每日次数限制的 iLovePDF 替代品？DocuPure 在浏览器沙盒本地完成 PDF 合并、拆分与转换，绝对隐私且永久免费。",
        heroBadge: "🔒 0 服务器上传 · 对标 iLovePDF",
        heroTitle: "隐私安全、无次数限制的 iLovePDF 极速替代方案",
        heroSubtitle: "厌倦了 iLovePDF 每天仅限 2 次转换的弹窗收费？担心将公司财务报表与商业合同上传至第三方服务器？DocuPure 采用 100% 浏览器本地内存计算，永久免费且绝不泄密。",
        comparisonTable: [
          {
            feature: "文件处理运算位置",
            docupure: "🔒 100% 浏览器本地沙盒内存（0 字节上传云端）",
            competitor: "☁️ 必须完整上传至第三方远程云服务器",
            highlight: true,
          },
          {
            feature: "免费版每日使用限额",
            docupure: "⚡ 100% 永久免费、无限次合并与转换",
            competitor: "⚠️ 每天仅限 2~3 次，随后强制弹窗拦截付费",
            highlight: true,
          },
          {
            feature: "隐私保密与数据安全",
            docupure: "🛡️ 绝对安全：文件物理隔离，绝不离开本地电脑",
            competitor: "⚠️ 存在云端数据留存与第三方服务器泄露风险",
            highlight: true,
          },
          {
            feature: "处理执行速度",
            docupure: "⚡ 毫秒级：本地 CPU + WebAssembly 硬件加速",
            competitor: "🐢 较慢：依赖网络带宽上传与云端排队",
          },
          {
            feature: "收费标准与订阅门槛",
            docupure: "🎉 核心工具 100% 永久免费无套路",
            competitor: "💳 每月收取高达 $7.00 美元订阅费",
          },
        ],
        whySwitchReasons: [
          {
            title: "商业合同与财务报表 0 泄密风险",
            desc: "律师、财务审计、跨境电商卖家和企业员工严禁将含有客户隐私或敏感数据的 PDF 发往外部服务器。DocuPure 100% 纯前端运行，杜绝一切泄密源头。",
            iconName: "ShieldCheck",
          },
          {
            title: "彻底告别限额弹窗与倒计时拦截",
            desc: "在紧急处理合同与报表时，不再被“今日免费额度已用完，请升级高级版”的弹窗打断工作节奏。",
            iconName: "Infinity",
          },
          {
            title: "毫秒级本地极速运算",
            desc: "无需忍受几十兆大文件漫长的网络上传与下载等待，本地 CPU 直接调用硬件指令集毫秒级处理完毕。",
            iconName: "Zap",
          },
        ],
        faqs: [
          {
            question: "为什么说 DocuPure 是 iLovePDF 的更优替代方案？",
            answer: "DocuPure 基于现代 WebAssembly 技术，将所有 PDF 解析、拼装、拆分与渲染全部置于用户浏览器本地运行。无需消耗服务器带宽与云端算力，因此我们能够向全球用户永久免费开放核心功能，且提供绝对的商业隐私保障。",
          },
          {
            question: "断网情况下可以使用 DocuPure 吗？",
            answer: "完全可以！网页加载完成后，所有核心 PDF 计算引擎已缓存在您的浏览器沙盒中，即使在飞机、高铁或离线断网环境中也能顺畅处理各种 PDF 文档。",
          },
        ],
      },
    },
  },
  {
    slug: "smallpdf-alternative",
    competitorName: "Smallpdf",
    path: "/smallpdf-alternative",
    locales: {
      en: {
        metaTitle: "Best Smallpdf Alternative (2026) - 100% Free In-Browser PDF Studio",
        metaDescription: "The #1 privacy-first Smallpdf alternative. Merge, split, compress, and convert PDFs locally without hitting daily 2-task paywalls or uploading sensitive data.",
        heroBadge: "Zero Server Uploads vs Smallpdf",
        heroTitle: "The Best Free Smallpdf Alternative with Unlimited Conversions",
        heroSubtitle: "Stop paying $12/month for basic PDF tasks. DocuPure provides unlimited, secure in-browser PDF tools with zero file upload risks.",
        comparisonTable: [
          {
            feature: "Processing Engine",
            docupure: "🔒 100% Local In-Browser WebAssembly",
            competitor: "☁️ Remote Cloud Processing",
            highlight: true,
          },
          {
            feature: "Daily Free Tasks",
            docupure: "⚡ Unlimited (No Limits)",
            competitor: "⚠️ Strictly 2 tasks / day",
            highlight: true,
          },
          {
            feature: "Price",
            docupure: "🎉 100% Free Forever",
            competitor: "💳 $12.00 / month ($108/yr)",
            highlight: true,
          },
          {
            feature: "Offline Support",
            docupure: "✅ Works 100% Offline once loaded",
            competitor: "❌ Requires active internet connection",
          },
        ],
        whySwitchReasons: [
          {
            title: "Save $144 Every Year",
            desc: "Why spend over a hundred dollars annually on simple PDF tools when modern WebAssembly does it for free in your browser?",
            iconName: "Zap",
          },
          {
            title: "100% Client-Side Privacy",
            desc: "Your tax returns, confidential pitches, and personal IDs never travel across the internet.",
            iconName: "ShieldCheck",
          },
          {
            title: "No Account Creation Required",
            desc: "Open the site and start merging or converting immediately with 0 signup friction.",
            iconName: "Infinity",
          },
        ],
        faqs: [
          {
            question: "Is DocuPure really completely free compared to Smallpdf?",
            answer: "Yes. Because DocuPure uses your local device's compute power rather than expensive cloud servers, we do not have massive hosting costs and can offer our tools for free.",
          },
        ],
      },
      zh: {
        metaTitle: "最佳 Smallpdf 替代工具 (2026) - 100% 浏览器本地免费 PDF 工作台",
        metaDescription: "排名第一的隐私优先 Smallpdf 替代方案。在本地合并、拆分、压缩和转换 PDF，告别每天 2 次的付费墙，0 字节上传云端。",
        heroBadge: "🔒 0 服务器上传 · 对标 Smallpdf",
        heroTitle: "无限次免费、超强隐私保护的 Smallpdf 极速替代方案",
        heroSubtitle: "拒绝为了简单的 PDF 处理每月支付 $12 美元高昂订阅费！DocuPure 提供完全基于浏览器沙盒的无限次 PDF 极速工具箱。",
        comparisonTable: [
          {
            feature: "底层计算引擎",
            docupure: "🔒 100% 浏览器本地 WebAssembly 沙盒计算",
            competitor: "☁️ 远程云端服务器中转处理",
            highlight: true,
          },
          {
            feature: "每日免费处理次数",
            docupure: "⚡ 无限次（100% 永久免费、无任何限制）",
            competitor: "⚠️ 严格限制每天仅 2 次，超出强制弹窗",
            highlight: true,
          },
          {
            feature: "收费标准",
            docupure: "🎉 核心工具永久免费，0 隐藏费用",
            competitor: "💳 每月 $12.00 美元（年付 $108/年）",
            highlight: true,
          },
          {
            feature: "离线断网支持",
            docupure: "✅ 网页加载后支持 100% 离线断网运行",
            competitor: "❌ 必须保持全程网络连接与上传",
          },
        ],
        whySwitchReasons: [
          {
            title: "每年立省 $144 美元订阅支出",
            desc: "当现代前端 WebAssembly 已经能在本地毫秒级完成 PDF 拼装时，完全没有必要每年花费数百美元购买基础工具订阅。",
            iconName: "Zap",
          },
          {
            title: "100% 客户端本地数据隔离",
            desc: "您的报税单、机密商业提案与个人证件等核心隐私绝不在互联网上传播，物理级防泄密。",
            iconName: "ShieldCheck",
          },
          {
            title: "免注册免登录，开箱即用",
            desc: "打开网页直接拖拽处理，无需繁琐的邮箱验证或手机注册流程。",
            iconName: "Infinity",
          },
        ],
        faqs: [
          {
            question: "为什么 DocuPure 能比 Smallpdf 完全免费？",
            answer: "因为 DocuPure 充分利用了用户本地计算机的 CPU 计算性能，而非昂贵的云端后端服务器集群。我们的服务器成本极低，因此能真正实现永久免费开放。",
          },
        ],
      },
    },
  },
  {
    slug: "adobe-acrobat-alternative",
    competitorName: "Adobe Acrobat",
    path: "/adobe-acrobat-alternative",
    locales: {
      en: {
        metaTitle: "Lightweight In-Browser Adobe Acrobat Alternative (2026)",
        metaDescription: "No heavy software installations or $20/mo Creative Cloud subscriptions. Fast, clean, in-browser PDF utilities built for everyday work.",
        heroBadge: "Zero Installs vs Adobe Acrobat",
        heroTitle: "Fast, Lightweight & Free Web Alternative to Adobe Acrobat",
        heroSubtitle: "Skip bulky 2GB software downloads and expensive monthly Adobe subscriptions. Merge, split, protect, and optimize PDF files directly in your web browser.",
        comparisonTable: [
          {
            feature: "Software Installation",
            docupure: "🚀 0 Install (Instant Web App)",
            competitor: "💾 Heavy 2GB+ desktop installer",
            highlight: true,
          },
          {
            feature: "Pricing",
            docupure: "🎉 100% Free Core Suite",
            competitor: "💳 $19.99 / month recurring subscription",
            highlight: true,
          },
          {
            feature: "Startup Time",
            docupure: "⚡ Instant sub-second page load",
            competitor: "⏳ 5-15 seconds desktop launch",
          },
          {
            feature: "Privacy Guarantee",
            docupure: "🔒 100% In-Browser Memory",
            competitor: "☁️ Adobe Cloud sync prompts",
          },
        ],
        whySwitchReasons: [
          {
            title: "No Bloatware or Background Daemons",
            desc: "Adobe desktop suites install multiple background updater daemons that consume system RAM and battery. DocuPure runs cleanly in a single browser tab.",
            iconName: "Zap",
          },
          {
            title: "Zero Monthly Subscription Burden",
            desc: "Save over $239/year per seat on Acrobat Pro licenses across your team.",
            iconName: "Infinity",
          },
          {
            title: "Cross-Platform on Any Device",
            desc: "Works seamlessly on Mac, Windows, Linux, Chromebooks, iPads, and smartphones.",
            iconName: "ShieldCheck",
          },
        ],
        faqs: [
          {
            question: "Do I need to install any browser extensions or plugins?",
            answer: "No. DocuPure runs natively in any standard modern web browser using HTML5 and WebAssembly standards without any plugin requirements.",
          },
        ],
      },
      zh: {
        metaTitle: "轻量级网页版 Adobe Acrobat 替代方案 (2026) - 免安装 · 永久免费",
        metaDescription: "无需下载臃肿的桌面软件，无需每月支付 $20 美元 Adobe 订阅费。轻量、纯粹、在浏览器本地秒级完成 PDF 拼装与加水印。",
        heroBadge: "🚀 0 安装依赖 · 对标 Adobe Acrobat",
        heroTitle: "极速、轻量、免安装的 Adobe Acrobat 网页替代方案",
        heroSubtitle: "告别动辄 2GB 的笨重桌面安装包与昂贵的 Adobe 全家桶月费！直接在浏览器内秒级完成 PDF 合并、拆分、水印防伪与流压缩。",
        comparisonTable: [
          {
            feature: "软件安装与环境要求",
            docupure: "🚀 0 安装：打开网页即刻秒级使用",
            competitor: "💾 臃肿庞大：需下载 2GB+ 桌面客户端",
            highlight: true,
          },
          {
            feature: "订阅价格",
            docupure: "🎉 核心工具套件 100% 永久免费",
            competitor: "💳 每月 $19.99 美元持续扣费 ($239/年)",
            highlight: true,
          },
          {
            feature: "启动与响应速度",
            docupure: "⚡ 毫秒级瞬时载入，零等待",
            competitor: "⏳ 桌面端冷启动耗时 5~15 秒",
          },
          {
            feature: "隐私与数据安全",
            docupure: "🔒 100% 浏览器本地内存沙盒隔离",
            competitor: "☁️ 频繁提示同步至 Adobe Creative Cloud",
          },
        ],
        whySwitchReasons: [
          {
            title: "彻底告别系统后台驻留进程",
            desc: "Adobe 客户端会安装大量后台自动更新服务和守护进程，持续占用电脑内存与电池。DocuPure 仅在单个浏览器标签页内轻量运行，关闭即彻底释放内存。",
            iconName: "Zap",
          },
          {
            title: "为每位员工每年立省 $239 美元",
            desc: "对于只需要合并、拆分和压缩 PDF 的日常办公需求，无需为每个工位采购昂贵的 Acrobat Pro 商业授权。",
            iconName: "Infinity",
          },
          {
            title: "跨平台支持任何操作系统",
            desc: "在 Windows、Mac、Linux、Chromebook 以及平板电脑上均可获得一致的极速体验。",
            iconName: "ShieldCheck",
          },
        ],
        faqs: [
          {
            question: "使用 DocuPure 需要安装浏览器插件或扩展程序吗？",
            answer: "完全不需要！DocuPure 采用纯原生 HTML5 与 WebAssembly 标准开发，只要有现代浏览器就能直接运行，无需安装任何额外插件。",
          },
        ],
      },
    },
  },
];

export function getLocalizedAlternative(page: AlternativePage, lang: Language): AlternativeLocaleContent {
  return page.locales[lang] || page.locales.en;
}

export function getAlternativePageBySlug(slug: string): AlternativePage | undefined {
  return ALTERNATIVE_PAGES.find((p) => p.slug === slug);
}
