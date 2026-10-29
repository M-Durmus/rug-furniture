import type { Metadata } from "next";
import { absoluteUrl, imageSize, site } from "@/lib/site";

export const titleTemplate = "%s | Wool & Loom";

export const defaultTitle = "Wool & Loom | Turkish Rugs and Furniture";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  absolute?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  pagination?: { previous?: string; next?: string };
};

export function formatTitle(title: string, absolute = false): string {
  if (absolute || title.includes("Wool & Loom")) return title;
  return titleTemplate.replace("%s", title);
}

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  absolute = false,
  type = "website",
  publishedTime,
  modifiedTime,
  pagination,
}: MetaInput): Metadata {
  const fullTitle = formatTitle(title, absolute);
  const canonical = absoluteUrl(path);
  const image = {
    url: "/images/og.png",
    width: imageSize.og.width,
    height: imageSize.og.height,
    alt: "Wool & Loom, Turkish rugs and furniture stocked in the United States",
  };

  return {
    title: absolute ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical },
    ...(pagination?.previous || pagination?.next ? { pagination } : {}),
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
