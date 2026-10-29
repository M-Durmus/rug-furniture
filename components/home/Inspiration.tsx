"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const rooms = ["All", "Living room", "Bedroom", "Dining", "Hall", "Seating"] as const;

type RoomName = (typeof rooms)[number];

const scenes: {
  room: Exclude<RoomName, "All">;
  title: string;
  text: string;
  href: string;
  image: string;
  cta: string;
}[] = [
  {
    room: "Living room",
    title: "Pale field, gray sofa",
    text: "An 8 by 10 leaves a border of bare floor at the walls.",
    href: "/rugs/size/8x10",
    image: "/images/photos/living.webp",
    cta: "Shop 8×10 rugs",
  },
  {
    room: "Living room",
    title: "Sofa on the pile",
    text: "Front legs on the rug, and the coffee table fully on it.",
    href: "/furniture/sofas",
    image: "/images/photos/rug-flat.webp",
    cta: "Shop sofas",
  },
  {
    room: "Living room",
    title: "A washable living room",
    text: "A flatweave under a sofa that sees traffic every day.",
    href: "/rugs/washable",
    image: "/images/photos/rug-washable.webp",
    cta: "Shop washable rugs",
  },
  {
    room: "Bedroom",
    title: "Beside the bed",
    text: "A 5 by 7 is enough for the foot of the bed.",
    href: "/rugs/size/5x7",
    image: "/images/photos/rug-detail.webp",
    cta: "Shop 5×7 rugs",
  },
  {
    room: "Dining",
    title: "A table on the rug",
    text: "Chairs should stay on the pile when they are pulled out.",
    href: "/rugs/size/6x9",
    image: "/images/photos/table.webp",
    cta: "Shop 6×9 rugs",
  },
  {
    room: "Hall",
    title: "A runner underfoot",
    text: "Hall runners are about 2 feet wide, measured in inches.",
    href: "/rugs/runner",
    image: "/images/photos/rug-runner.webp",
    cta: "Shop runners",
  },
  {
    room: "Seating",
    title: "Linen and boucle",
    text: "Sofas scaled to share an 8 by 10 with two chairs.",
    href: "/furniture/sofas",
    image: "/images/photos/sofa.webp",
    cta: "Shop sofas",
  },
  {
    room: "Seating",
    title: "A chair at the edge",
    text: "Front legs meant to share the rug with the sofa.",
    href: "/furniture/accent-chairs",
    image: "/images/photos/chair.webp",
    cta: "Shop accent chairs",
  },
];

export function Inspiration() {
  const [room, setRoom] = useState<RoomName>("All");
  const visible = room === "All" ? scenes : scenes.filter((scene) => scene.room === room);

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Rooms"
      >
        {rooms.map((item) => {
          const pressed = item === room;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={pressed}
              onClick={() => setRoom(item)}
              className={`inline-flex min-h-10 shrink-0 items-center rounded-[2px] border px-3 text-sm transition-colors ${
                pressed ? "border-ink bg-ink text-bg" : "border-line bg-card hover:border-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((scene) => (
          <li key={`${scene.room}-${scene.title}`}>
            <Link href={scene.href} className="group block h-full bg-card">
              <span className="relative block aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={scene.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span className="block p-4">
                <span className="block text-[11px] font-medium tracking-[0.18em] text-mute uppercase">
                  {scene.room}
                </span>
                <span className="mt-2 block font-serif text-h3">{scene.title}</span>
                <span className="mt-2 block text-sm text-mute">{scene.text}</span>
                <span className="mt-4 inline-flex text-sm underline underline-offset-4">{scene.cta}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
