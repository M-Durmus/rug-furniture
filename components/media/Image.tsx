"use client";

import { useState } from "react";
import { FurnitureArt, type FurnitureKind } from "@/components/media/FurnitureArt";
import { RugArt } from "@/components/media/RugArt";

type ProductImageProps = {
  src?: string;
  alt: string;
  colors?: string[];
  subject?: "rug" | "furniture";
  furniture?: FurnitureKind;
  style?: string;
  className?: string;
};

export function Image({
  src,
  alt,
  colors = [],
  subject = "rug",
  furniture = "sofa",
  style,
  className,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showArt = !src || failed;

  if (showArt) {
    return subject === "furniture" ? (
      <FurnitureArt colors={colors} kind={furniture} label={alt} className={className} />
    ) : (
      <RugArt colors={colors} style={style} label={alt} className={className} />
    );
  }

  return (
    // A real photo replaces the pattern. A failed load returns to the art.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
