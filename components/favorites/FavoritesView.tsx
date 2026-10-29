"use client";

import Link from "next/link";
import { Image } from "@/components/media/Image";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { useFavorites } from "@/components/favorites/store";
import { Button } from "@/components/ui/Button";

export function FavoritesView() {
  const { items } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="mt-8 max-w-xl border border-line bg-card p-6">
        <h2 className="font-serif text-h2">No favorites yet</h2>
        <p className="mt-3">
          Use the heart on a rug or furniture card. The list stays in this browser.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button href="/rugs">Shop rugs</Button>
          <Button href="/furniture" variant="outline">
            Shop furniture
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.id} className="relative border border-line bg-card">
          <FavoriteButton item={item} className="absolute top-2 right-2 z-10" />
          <Link href={item.href} className="block">
            <div className="aspect-[4/5] bg-sand">
              <Image
                alt=""
                colors={item.colors}
                subject={item.subject}
                furniture={item.furniture}
                style={item.style}
                className="h-full w-full"
              />
            </div>
            <h2 className="p-4 font-serif text-h3">{item.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
