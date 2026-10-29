import { ProductShelf, type ShelfItem } from "@/components/product/ProductShelf";
import { productPath } from "@/lib/catalog/product-path";
import { getProducts, getSizePrices } from "@/lib/data/catalog";

export async function CrossSell() {
  const page = await getProducts({ type: "rug" }, "featured", { pageSize: 4 });
  const items: ShelfItem[] = [];
  for (const product of page.items) {
    const size = product.sizes[0];
    if (!size) continue;
    const prices = await getSizePrices(product.id, size.label);
    items.push({
      slug: product.slug,
      title: product.title,
      href: productPath(product),
      price: prices?.pay ?? product.salePrice ?? product.price,
      compareAt: product.salePrice !== undefined ? prices?.list : undefined,
      colors: product.colors.map((color) => color.hex),
      subject: "rug",
      style: product.style,
      sizeLabel: size.label,
    });
  }
  return <ProductShelf title="Rugs from the warehouse" items={items} />;
}
