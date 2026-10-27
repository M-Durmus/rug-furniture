"use client";

import { useState } from "react";
import { RugArt } from "@/components/media/RugArt";

const styles = [
  "All",
  "Modern Farmhouse",
  "Boho",
  "Minimalist",
  "Traditional",
  "Coastal",
  "Scandinavian",
  "Mid-Century",
] as const;

type StyleName = (typeof styles)[number];

const scenes: { style: Exclude<StyleName, "All">; room: string; colors: string[]; pattern: string }[] = [
  { style: "Modern Farmhouse", room: "Living room", colors: ["#e7dccb", "#c4a574", "#6f675b"], pattern: "field" },
  { style: "Modern Farmhouse", room: "Dining room", colors: ["#f3efe6", "#a15b45", "#2a2724"], pattern: "stripe" },
  { style: "Boho", room: "Living room", colors: ["#c4896a", "#7a2f24", "#1d1a16"], pattern: "medallion" },
  { style: "Boho", room: "Bedroom", colors: ["#d7b59a", "#8a7355", "#3e342c"], pattern: "field" },
  { style: "Minimalist", room: "Living room", colors: ["#f4ecdf", "#d9d0c3", "#6f675b"], pattern: "field" },
  { style: "Minimalist", room: "Entry", colors: ["#ebe3d3", "#cfc6b8", "#1d1a16"], pattern: "grid" },
  { style: "Traditional", room: "Living room", colors: ["#8d3b3b", "#c4a574", "#1d1a16"], pattern: "medallion" },
  { style: "Traditional", room: "Library", colors: ["#2c3e5a", "#c4896a", "#1d1a16"], pattern: "medallion" },
  { style: "Coastal", room: "Living room", colors: ["#e7eef2", "#8aa4b5", "#3e4c66"], pattern: "stripe" },
  { style: "Coastal", room: "Bedroom", colors: ["#f7f3ea", "#9eb7b3", "#3e4c66"], pattern: "field" },
  { style: "Scandinavian", room: "Living room", colors: ["#f6f1e8", "#d7d2c8", "#6f675b"], pattern: "grid" },
  { style: "Scandinavian", room: "Dining room", colors: ["#efe8dc", "#b7c4b1", "#2a2724"], pattern: "field" },
  { style: "Mid-Century", room: "Living room", colors: ["#c46b3a", "#e7dccb", "#1d1a16"], pattern: "grid" },
  { style: "Mid-Century", room: "Den", colors: ["#6f8f72", "#e6dfd2", "#1d1a16"], pattern: "stripe" },
];

export function Inspiration() {
  const [style, setStyle] = useState<StyleName>("All");
  const visible = style === "All" ? scenes : scenes.filter((scene) => scene.style === style);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Inspiration styles">
        {styles.map((item) => {
          const pressed = item === style;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={pressed}
              onClick={() => setStyle(item)}
              className={`inline-flex min-h-10 shrink-0 items-center rounded-[2px] border px-3 text-sm ${
                pressed ? "border-ink bg-ink text-bg" : "border-line bg-card"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((scene) => (
          <li key={`${scene.style}-${scene.room}`}>
            <figure className="border border-line bg-card">
              <div className="aspect-[4/5] bg-sand">
                <RugArt
                  label={`${scene.style} ${scene.room.toLowerCase()}`}
                  colors={scene.colors}
                  style={scene.pattern}
                  className="h-full w-full"
                />
              </div>
              <figcaption className="p-3 text-sm">
                <span className="block text-mute">{scene.style}</span>
                {scene.room}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
