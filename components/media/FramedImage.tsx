import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function FramedImage({ src, alt, width, height, sizes, priority = false, className }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className ?? "h-auto w-full"}
    />
  );
}
