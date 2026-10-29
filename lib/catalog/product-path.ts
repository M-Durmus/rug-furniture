/** Public path for a catalog product. Furniture is nested under its category. */
export function productPath(product: {
  type: "rug" | "furniture";
  slug: string;
  category: string;
}): string {
  if (product.type === "rug") return `/rugs/${product.slug}`;
  return `/furniture/${product.category}/${product.slug}`;
}
