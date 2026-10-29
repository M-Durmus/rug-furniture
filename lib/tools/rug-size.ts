export const ROOM_BORDERS = {
  living: 2,
  bedroom: 1.5,
  dining: 3,
} as const;

export type RoomKind = keyof typeof ROOM_BORDERS;

export type StockSize = {
  slug: string;
  label: string;
  width: number;
  length: number;
};

/** Stock sizes that have a listing. Runners stay in the set so a long hall can match. */
export const STOCK_SIZES: StockSize[] = [
  { slug: "2x3", label: "2×3", width: 2, length: 3 },
  { slug: "2x8", label: "2'6\"×8' runner", width: 2.5, length: 8 },
  { slug: "3x5", label: "3×5", width: 3, length: 5 },
  { slug: "4x6", label: "4×6", width: 4, length: 6 },
  { slug: "5x7", label: "5×7", width: 5, length: 7 },
  { slug: "5x8", label: "5×8", width: 5, length: 8 },
  { slug: "6x9", label: "6×9", width: 6, length: 9 },
  { slug: "8x10", label: "8×10", width: 8, length: 10 },
  { slug: "9x12", label: "9×12", width: 9, length: 12 },
  { slug: "10x14", label: "10×14", width: 10, length: 14 },
];

export type SizeMatch = StockSize & { href: string; area: number };

export function recommendRugSize(
  room: RoomKind,
  roomWidth: number,
  roomLength: number,
): SizeMatch | null {
  const border = ROOM_BORDERS[room];
  const maxWidth = roomWidth - border * 2;
  const maxLength = roomLength - border * 2;
  if (maxWidth <= 0 || maxLength <= 0) return null;

  const fits = STOCK_SIZES.filter((size) => {
    const asListed = size.width <= maxWidth && size.length <= maxLength;
    const turned = size.length <= maxWidth && size.width <= maxLength;
    return asListed || turned;
  });
  if (fits.length === 0) return null;
  const best = fits.reduce((left, right) =>
    left.width * left.length >= right.width * right.length ? left : right,
  );
  return {
    ...best,
    area: best.width * best.length,
    href: `/rugs/size/${best.slug}`,
  };
}
