"use client";

import Image from "next/image";
import { useState } from "react";

type Frame = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  text: string;
};

const frames: Record<string, Frame> = {
  "rug-cleaning": {
    before: "/images/photos/rug-field.webp",
    after: "/images/photos/living.webp",
    beforeAlt: "A wool rug seen up close on the floor",
    afterAlt: "A pale rug back in a living room in front of a gray sofa",
    text: "Drag across the frame. One side is the rug up close. The other is the piece back in the room.",
  },
  "rug-repair": {
    before: "/images/photos/rug-border.webp",
    after: "/images/photos/rug-persian.webp",
    beforeAlt: "A kilim edge and field, seen from above",
    afterAlt: "A gray rug finished in a modern room",
    text: "Drag across the frame. The edge is the close view. The room is the rug back in place.",
  },
  "custom-sizing": {
    before: "/images/photos/rug-oushak.webp",
    after: "/images/photos/rug-flat.webp",
    beforeAlt: "A cream wool rug rolled before it is fit to a room",
    afterAlt: "A rug under a sofa and a round coffee table",
    text: "Drag across the frame. The roll is the rug before it is fit. The room shows it under the furniture.",
  },
  "pickup-and-delivery": {
    before: "/images/photos/rug-oushak.webp",
    after: "/images/photos/rug-washable.webp",
    beforeAlt: "A cream wool rug rolled for the truck",
    afterAlt: "A rug placed in a living room",
    text: "Drag across the frame. The roll is the rug ready to move. The room is where it lands.",
  },
};

const fallback = frames["rug-cleaning"] as Frame;

export function BeforeAfterSlider({ service }: { service: string }) {
  const frame = frames[service] ?? fallback;
  const [position, setPosition] = useState(50);

  return (
    <section className="mt-14" aria-labelledby="before-after-heading">
      <h2 id="before-after-heading" className="font-serif text-h2">
        Before and after
      </h2>
      <p className="mt-3 max-w-2xl">{frame.text}</p>
      <div className="relative mt-6 aspect-[4/5] max-w-3xl overflow-hidden bg-sand sm:aspect-[16/10]">
        <Image
          src={frame.before}
          alt={frame.beforeAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={frame.after}
            alt={frame.afterAlt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-[#fafaf8]"
          style={{ left: `${position}%` }}
        />
        <span className="absolute top-3 left-3 bg-card px-2 py-1 text-xs">Before</span>
        <span className="absolute top-3 right-3 bg-card px-2 py-1 text-xs">After</span>
      </div>
      <label className="mt-3 block max-w-3xl text-sm">
        Compare before and after
        <input
          className="mt-2 w-full accent-accent"
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
