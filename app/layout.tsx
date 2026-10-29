import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ToastProvider } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationAndWebsiteJsonLd } from "@/lib/seo/jsonld";
import { defaultTitle, titleTemplate } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-cormorant",
  fallback: ["Times New Roman", "Georgia", "serif"],
  adjustFontFallback: true,
});

const themeScript = `try{var t=localStorage.getItem("wool-loom-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: titleTemplate },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#14110e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <JsonLd data={organizationAndWebsiteJsonLd()} />
        <ToastProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
