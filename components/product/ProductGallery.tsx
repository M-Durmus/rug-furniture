"use client";

import { useRef, useState } from "react";
import NextImage from "next/image";
import { FurnitureArt, type FurnitureKind } from "@/components/media/FurnitureArt";
import { RugArt } from "@/components/media/RugArt";
import { imageSizes } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

export type GallerySlide = {
  key: string;
  alt: string;
  src?: string;
  colors: string[];
};

export function ProductGallery({
  subject,
  furniture,
  style,
  slides,
  index,
  onIndex,
}: {
  subject: "rug" | "furniture";
  furniture: FurnitureKind;
  style?: string;
  slides: GallerySlide[];
  index: number;
  onIndex: (index: number) => void;
}) {
  const [origin, setOrigin] = useState("50% 50%");
  const start = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  function step(delta: number) {
    const next = (index + delta + slides.length) % slides.length;
    onIndex(next);
  }

  return (
    <div>
      <div
        className="relative aspect-[4/5] overflow-hidden bg-sand"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          start.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const originPoint = start.current;
          start.current = null;
          if (!originPoint || event.pointerType === "mouse") return;
          const dx = event.clientX - originPoint.x;
          const dy = event.clientY - originPoint.y;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          step(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="relative h-full w-full transition-transform duration-200 ease-out lg:hover:scale-[1.65]"
          style={{ transformOrigin: origin }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setOrigin(`${x}% ${y}%`);
          }}
          onMouseLeave={() => setOrigin("50% 50%")}
        >
          {slide.src ? (
            <NextImage
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={imageSizes.gallery}
              className="object-cover"
              preload={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ) : subject === "furniture" ? (
            <FurnitureArt
              colors={slide.colors}
              kind={furniture}
              label={slide.alt}
              className="h-full w-full"
            />
          ) : (
            <RugArt
              colors={slide.colors}
              style={style}
              label={slide.alt}
              className="h-full w-full"
            />
          )}
        </div>
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute top-1/2 left-2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[2px] border border-line bg-card"
              aria-label="Previous image"
              onClick={() => step(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[2px] border border-line bg-card"
              aria-label="Next image"
              onClick={() => step(1)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {slides.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto">
          {slides.map((item, itemIndex) => (
            <li key={item.key} className="shrink-0">
              <button
                type="button"
                aria-label={item.alt}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => onIndex(itemIndex)}
                className={cn(
                  "h-20 w-16 overflow-hidden border bg-sand",
                  itemIndex === index ? "border-ink" : "border-line",
                )}
              >
                {item.src ? (
                  <NextImage
                    src={item.src}
                    alt=""
                    width={64}
                    height={80}
                    sizes="64px"
                    className="h-full w-full object-cover"
                  />
                ) : subject === "furniture" ? (
                  <FurnitureArt
                    colors={item.colors}
                    kind={furniture}
                    label=""
                    className="h-full w-full"
                  />
                ) : (
                  <RugArt colors={item.colors} style={style} label="" className="h-full w-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
