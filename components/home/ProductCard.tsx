import Link from "next/link";
import NextImage from "next/image";
import { FurnitureArt, type FurnitureKind } from "@/components/media/FurnitureArt";
import { RugArt } from "@/components/media/RugArt";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { QuickAdd } from "@/components/home/QuickAdd";
import { productPath } from "@/lib/catalog/product-path";
import type { Product, ProductSize } from "@/types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function furnitureKind(category: string): FurnitureKind {
  if (category === "coffee-tables") return "table";
  if (category === "accent-chairs") return "chair";
  if (category === "side-tables") return "side";
  return "sofa";
}

export function feetLabel(size: ProductSize): string {
  return `${size.widthFt}' × ${size.lengthFt}'`;
}

export function ProductCard({
  product,
  size,
  href,
  unitPrice,
}: {
  product: Product;
  size: ProductSize;
  href?: string;
  unitPrice?: number;
}) {
  const price = unitPrice ?? product.salePrice ?? product.price;
  const compareAt = product.salePrice && price === product.salePrice ? product.price : undefined;
  const color = product.colors[0];
  const colors = product.colors.map((item) => item.hex);
  const photo = product.images[0];
  const media = photo ? (
    <NextImage
      src={photo}
      alt={product.title}
      fill
      sizes="(min-width: 1024px) 25vw, 50vw"
      className="object-cover"
    />
  ) : product.type === "furniture" ? (
    <FurnitureArt colors={colors} kind={furnitureKind(product.category)} label={product.title} />
  ) : (
    <RugArt colors={colors} style={product.style} label={product.title} />
  );
  const path = href ?? productPath(product);

  return (
    <article className="relative flex h-full flex-col border border-line bg-card">
      <FavoriteButton
        className="absolute top-2 right-2 z-10"
        item={{
          id: product.id,
          title: product.title,
          href: path,
          colors: product.colors.map((color) => color.hex),
          subject: product.type,
          style: product.style,
          furniture: product.type === "furniture" ? furnitureKind(product.category) : undefined,
        }}
      />
      {href ? (
        <Link href={href} className="relative block aspect-[4/5] bg-sand">
          {media}
        </Link>
      ) : (
        <div className="relative aspect-[4/5] bg-sand">{media}</div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-h3">
          {href ? (
            <Link href={href} className="hover:underline">
              {product.title}
            </Link>
          ) : (
            product.title
          )}
        </h3>
        <p className="mt-1 text-sm text-mute">{feetLabel(size)}</p>
        <p className="mt-2">
          <span>{usd.format(price)}</span>
          {compareAt ? (
            <span className="ml-2 text-sm text-mute line-through">{usd.format(compareAt)}</span>
          ) : null}
        </p>
        <p className="mt-1 text-sm text-mute">
          {product.stock} in stock · {product.warehouse} · {product.deliveryDays} days
        </p>
        {color ? (
          <QuickAdd
            productId={product.id}
            title={product.title}
            sizeLabel={size.label}
            colorName={color.name}
            unitPrice={price}
            stock={product.stock}
          />
        ) : null}
      </div>
    </article>
  );
}
