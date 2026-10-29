import Link from "next/link";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { FramedImage } from "@/components/media/FramedImage";
import { formatUsd } from "@/lib/format";
import type { Product } from "@/lib/data/types";
import { imageSizes } from "@/lib/site";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <article className="relative flex h-full flex-col">
      <FavoriteButton
        className="absolute top-2 right-2 z-10"
        item={{
          id: product.id,
          title: product.name,
          href: product.href,
          colors: [],
          subject: product.kind,
          style: product.style,
        }}
      />
      <Link href={product.href} className="block">
        <FramedImage
          src={product.image}
          alt={product.imageAlt}
          width={product.width}
          height={product.height}
          sizes={imageSizes.card}
          priority={priority}
        />
        <h3 className="mt-3 min-h-8 font-serif text-2xl leading-8">{product.name}</h3>
        <p className="min-h-6 text-sm text-muted">
          {product.sizeLabel} · {product.style}
        </p>
        <p className="mt-1 min-h-6">{formatUsd(product.price)}</p>
      </Link>
    </article>
  );
}
