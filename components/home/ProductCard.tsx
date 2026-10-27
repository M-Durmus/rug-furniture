import { Image } from "@/components/media/Image";
import type { FurnitureKind } from "@/components/media/FurnitureArt";
import { QuickAdd } from "@/components/home/QuickAdd";
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
}: {
  product: Product;
  size: ProductSize;
}) {
  const price = product.salePrice ?? product.price;
  const color = product.colors[0];

  return (
    <article className="flex h-full flex-col border border-line bg-card">
      <div className="aspect-[4/5] bg-sand">
        <Image
          alt={product.title}
          colors={product.colors.map((item) => item.hex)}
          subject={product.type}
          furniture={furnitureKind(product.category)}
          style={product.style}
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-h3">{product.title}</h3>
        <p className="mt-1 text-sm text-mute">{feetLabel(size)}</p>
        <p className="mt-2">
          {product.salePrice ? (
            <>
              <span>{usd.format(product.salePrice)}</span>
              <span className="ml-2 text-sm text-mute line-through">{usd.format(product.price)}</span>
            </>
          ) : (
            usd.format(product.price)
          )}
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
