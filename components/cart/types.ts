export type CartCatalogProduct = {
  id: string;
  title: string;
  href: string;
  colors: string[];
  subject: "rug" | "furniture";
  furniture?: "sofa" | "table" | "chair" | "side";
  style?: string;
  image?: string;
  stock: number;
};

export type CartSuggestion = {
  title: string;
  text: string;
  href: string;
  action: string;
};
