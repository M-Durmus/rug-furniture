export type SearchEntry = {
  id: string;
  kind: "Product" | "Category" | "Service" | "Journal";
  title: string;
  href: string;
  text: string;
};

export type CartProductInfo = {
  id: string;
  title: string;
  href: string;
  subject: "rug" | "furniture";
  furniture?: "sofa" | "table" | "chair" | "side";
  colors: string[];
  style?: string;
};

export type ServiceLink = {
  slug: string;
  name: string;
  shortDescription: string;
};

export const iconButtonClass =
  "relative inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink";
