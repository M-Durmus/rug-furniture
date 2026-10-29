"use client";

import { useState } from "react";
import Link from "next/link";
import { Image } from "@/components/media/Image";

export type GalleryRug = {
  id: string;
  title: string;
  href: string;
  category: string;
  colors: string[];
  style?: string;
};

const labels: Record<string, string> = {
  oushak: "Oushak",
  vintage: "Vintage",
  runner: "Runners",
  washable: "Washable",
  turkish: "Turkish",
  "persian-style": "Persian-style",
};

export function StyleGallery({ rugs }: { rugs: GalleryRug[] }) {
  const categories = ["all", ...new Set(rugs.map((rug) => rug.category))];
  const [active, setActive] = useState("all");
  const shown = (active === "all" ? rugs : rugs.filter((rug) => rug.category === active)).slice(
    0,
    12,
  );

  return (
    <div className="mt-8">
      <div role="group" aria-label="Style filters" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              className={`min-h-10 border px-3 text-sm ${selected ? "border-ink bg-ink text-bg" : "border-line"}`}
              onClick={() => setActive(category)}
            >
              {category === "all" ? "All" : (labels[category] ?? category)}
            </button>
          );
        })}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {shown.map((rug) => (
          <li key={rug.id} className="border border-line bg-card">
            <Link href={rug.href} className="block">
              <div className="aspect-[4/5] bg-sand">
                <Image
                  alt=""
                  colors={rug.colors}
                  subject="rug"
                  style={rug.style}
                  className="h-full w-full"
                />
              </div>
              <h2 className="p-4 font-serif text-h3">{rug.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 ? <p className="mt-6">No rugs in this style yet.</p> : null}
    </div>
  );
}
