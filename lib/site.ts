export const site = {
  name: "Wool & Loom",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.woolandloom.com").replace(/\/$/, ""),
  description:
    "Turkish rugs and furniture in stock at Wool & Loom warehouses in New Jersey, Georgia, Texas, and California, plus quote-based rug care.",
  locale: "en_US",
  language: "en",
  currency: "USD",
  email: "hello@woolandloom.com",
  phone: "+1-973-555-0148",
  phoneDisplay: "(973) 555-0148",
  updated: "2026-10-01",
} as const;

export const imageSize = {
  product: { width: 640, height: 800 },
  room: { width: 1200, height: 675 },
  og: { width: 1200, height: 630 },
  logo: { width: 512, height: 512 },
} as const;

export const imageSizes = {
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  gallery: "(max-width: 1024px) 100vw, 640px",
  hero: "(max-width: 1024px) 100vw, 50vw",
  room: "(max-width: 768px) 100vw, 720px",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).toString();
}
