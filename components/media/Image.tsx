import { FurnitureArt, type FurnitureKind } from "@/components/media/FurnitureArt";
import { Photo } from "@/components/media/Photo";
import { RugArt } from "@/components/media/RugArt";
import { imageSizes } from "@/lib/site";

type ProductImageProps = {
  src?: string;
  alt: string;
  colors?: string[];
  subject?: "rug" | "furniture";
  furniture?: FurnitureKind;
  style?: string;
  className?: string;
  sizes?: string;
};

export function Image({
  src,
  alt,
  colors = [],
  subject = "rug",
  furniture = "sofa",
  style,
  className,
  sizes = imageSizes.card,
}: ProductImageProps) {
  if (!src) {
    return subject === "furniture" ? (
      <FurnitureArt colors={colors} kind={furniture} label={alt} className={className} />
    ) : (
      <RugArt colors={colors} style={style} label={alt} className={className} />
    );
  }

  return (
    <Photo
      src={src}
      alt={alt}
      colors={colors}
      subject={subject}
      furniture={furniture}
      style={style}
      className={className}
      sizes={sizes}
    />
  );
}
