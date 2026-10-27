import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/data/types";

export function RelatedProducts({ products, title = "Related rugs and furniture" }: { products: Product[]; title?: string }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="related-products">
      <h2 id="related-products" className="font-serif text-4xl">
        {title}
      </h2>
      <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
