import Link from "next/link";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Image } from "@/components/media/Image";
import type { FurnitureKind } from "@/components/media/FurnitureArt";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export type ShelfItem = {
  slug: string;
  productId?: string;
  title: string;
  href: string;
  price: number;
  compareAt?: number;
  colors: string[];
  subject: "rug" | "furniture";
  furniture?: FurnitureKind;
  style?: string;
  sizeLabel: string;
};

export function ProductShelf({ title, items }: { title: string; items: ShelfItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="font-serif text-h2">{title}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.slug} className="relative">
            {item.productId ? (
              <FavoriteButton
                className="absolute top-2 right-2 z-10"
                item={{
                  id: item.productId,
                  title: item.title,
                  href: item.href,
                  colors: item.colors,
                  subject: item.subject,
                  style: item.style,
                  furniture: item.furniture,
                }}
              />
            ) : null}
            <Link href={item.href} className="group">
              <div className="aspect-[4/5] bg-sand" aria-hidden="true">
                <Image
                  alt=""
                  colors={item.colors}
                  subject={item.subject}
                  furniture={item.furniture}
                  style={item.style}
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 50vw, 280px"
                />
              </div>
              <h3 className="mt-3 text-base group-hover:underline">{item.title}</h3>
              <p className="text-sm text-mute">{item.sizeLabel}</p>
              <p className="mt-1">
                {usd.format(item.price)}
                {item.compareAt ? (
                  <s className="ml-2 text-mute">{usd.format(item.compareAt)}</s>
                ) : null}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
