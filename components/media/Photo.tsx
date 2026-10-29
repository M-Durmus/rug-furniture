"use client";

import { useState } from "react";
import NextImage from "next/image";
import { FurnitureArt, type FurnitureKind } from "@/components/media/FurnitureArt";
import { RugArt } from "@/components/media/RugArt";
import { imageSize } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

export function Photo({
  src,
  alt,
  colors = [],
  subject = "rug",
  furniture = "sofa",
  style,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  colors?: string[];
  subject?: "rug" | "furniture";
  furniture?: FurnitureKind;
  style?: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return subject === "furniture" ? (
      <FurnitureArt colors={colors} kind={furniture} label={alt} className={className} />
    ) : (
      <RugArt colors={colors} style={style} label={alt} className={className} />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={imageSize.product.width}
      height={imageSize.product.height}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
