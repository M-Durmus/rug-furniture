"use client";

import { useFavorites, type SavedFavorite } from "@/components/favorites/store";

export function FavoriteButton({
  item,
  className = "",
}: {
  item: SavedFavorite;
  className?: string;
}) {
  const favorites = useFavorites();
  const saved = favorites.saved(item.id);

  return (
    <button
      type="button"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-line bg-card ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from favorites` : `Save ${item.title}`}
      onClick={() => favorites.toggle(item)}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M9 15.2 2.6 9.1C1.4 8 1.2 6 2.4 4.8 3.6 3.6 5.6 3.5 6.9 4.6L9 6.5l2.1-1.9c1.3-1.1 3.3-1 4.5.2 1.2 1.2 1 3.2-.2 4.3L9 15.2Z"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </button>
  );
}
