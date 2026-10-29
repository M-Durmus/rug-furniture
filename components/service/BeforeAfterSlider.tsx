"use client";

import { useState } from "react";
import { RugArt } from "@/components/media/RugArt";

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <section className="mt-14" aria-labelledby="before-after-heading">
      <h2 id="before-after-heading" className="font-serif text-h2">
        Before and after
      </h2>
      <p className="mt-3 max-w-2xl">
        Photographs of finished work are not on this page yet. The slider is a labeled placeholder.
      </p>
      <div className="relative mt-6 aspect-[4/5] max-w-xl overflow-hidden bg-sand sm:aspect-[16/10]">
        <RugArt
          colors={["#8a7355", "#3e342c", "#1d1a16"]}
          style="field"
          label="Before, placeholder pattern"
          className="h-full w-full"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <RugArt
            colors={["#e7dccb", "#c4b49a", "#8a7355"]}
            style="medallion"
            label="After, placeholder pattern"
            className="h-full w-full"
          />
        </div>
        <span className="absolute top-3 left-3 bg-card px-2 py-1 text-xs">Before</span>
        <span className="absolute top-3 right-3 bg-card px-2 py-1 text-xs">After</span>
      </div>
      <label className="mt-3 block max-w-xl text-sm">
        Compare before and after
        <input
          className="mt-2 w-full"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </label>
    </section>
  );
}
