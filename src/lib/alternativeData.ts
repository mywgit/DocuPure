export interface AlternativePage {
  slug: string;
  competitorName: string;
  path: string;
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

export const ALTERNATIVE_PAGES: AlternativePage[] = [
  {
    slug: "ilovepdf-alternative",
    competitorName: "iLovePDF",
    path: "/ilovepdf-alternative",
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
  {
    slug: "smallpdf-alternative",
    competitorName: "Smallpdf",
    path: "/smallpdf-alternative",
    metaTitle: "Best Smallpdf Alternative (2026) - 100% Free In-Browser PDF Studio",
    metaDescription: "The #1 privacy-first Smallpdf alternative. Merge, split, compress, and convert PDFs locally without hitting daily 2-task paywalls or uploading sensitive data.",
    heroBadge: "100% Free vs Smallpdf Paywall",
    heroTitle: "The Truly Free, In-Browser Alternative to Smallpdf",
    heroSubtitle: "Smallpdf restricts free users to 2 documents per day and charges $12/month. DocuPure gives you unlimited in-browser PDF tools with zero file tracking.",
    comparisonTable: [
      {
        feature: "Free Usage Quotas",
        docupure: "⚡ 100% Unlimited Free Conversions",
        competitor: "❌ Strictly 2 documents / day",
        highlight: true,
      },
      {
        feature: "Server Uploads",
        docupure: "🔒 0 Bytes Uploaded (Client-side memory)",
        competitor: "☁️ Mandatory Cloud Upload",
        highlight: true,
      },
      {
        feature: "Monthly Cost",
        docupure: "🎉 $0.00 Free Forever",
        competitor: "💳 $12.00 / month",
        highlight: true,
      },
      {
        feature: "Offline Compatibility",
        docupure: "✓ Works offline once loaded",
        competitor: "❌ Requires active cloud connection",
      },
    ],
    whySwitchReasons: [
      {
        title: "100% Free Forever Without Artificial Limits",
        desc: "Work on as many PDF files as you need without Smallpdf's frustrating daily lockout screen.",
        iconName: "Smile",
      },
      {
        title: "Complete Local Privacy",
        desc: "All manipulations happen in your browser sandbox using pdf-lib. Your documents remain strictly private on your computer.",
        iconName: "Lock",
      },
    ],
    faqs: [
      {
        question: "Is DocuPure really completely free compared to Smallpdf?",
        answer: "Yes! All core tools (merge, split, images to PDF, compress, protect) are 100% free with unlimited tasks.",
      },
    ],
  },
  {
    slug: "adobe-acrobat-alternative",
    competitorName: "Adobe Acrobat",
    path: "/adobe-acrobat-alternative",
    metaTitle: "Lightweight Adobe Acrobat Alternative (2026) - Free Online In-Browser PDF Tools",
    metaDescription: "Fast, zero-install alternative to heavy Adobe Acrobat software. Merge, split, compress, and convert PDFs instantly in your browser for free.",
    heroBadge: "Zero Installation vs Heavy Acrobat",
    heroTitle: "The Instant, Web-Native Alternative to Adobe Acrobat",
    heroSubtitle: "No need to install 2GB desktop software or pay $239/year for basic PDF tasks. DocuPure provides lightning-fast in-browser PDF utilities instantly.",
    comparisonTable: [
      {
        feature: "Software Installation",
        docupure: "⚡ Instant Web App (0 MB download)",
        competitor: "🐢 2GB+ Heavy Desktop Suite",
        highlight: true,
      },
      {
        feature: "Annual Cost",
        docupure: "🎉 $0 Free",
        competitor: "💳 $239.88 / year (Acrobat Pro)",
        highlight: true,
      },
      {
        feature: "Startup Time",
        docupure: "⚡ Sub-second browser load",
        competitor: "🐢 10-15 seconds desktop boot",
      },
    ],
    whySwitchReasons: [
      {
        title: "No Bloatware, Works on Any Device",
        desc: "Open DocuPure on Chromebooks, MacBooks, Windows PCs, or iPads without installing heavy Acrobat packages.",
        iconName: "Feather",
      },
      {
        title: "Save Hundreds of Dollars Yearly",
        desc: "Get common day-to-day PDF tasks done without paying expensive Adobe Creative Cloud subscription fees.",
        iconName: "DollarSign",
      },
    ],
    faqs: [
      {
        question: "Can DocuPure replace Adobe Acrobat for common tasks?",
        answer: "Yes! For day-to-day PDF merging, splitting, compressing, converting images, and applying watermarks, DocuPure provides a 100% free in-browser replacement without software installs.",
      },
    ],
  },
];

export function getAlternativePageBySlug(slug: string): AlternativePage | undefined {
  return ALTERNATIVE_PAGES.find((p) => p.slug === slug);
}
