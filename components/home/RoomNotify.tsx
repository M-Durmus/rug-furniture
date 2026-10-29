"use client";

import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

const steps = [
  { title: "Upload a photo", text: "A straight-on photo of the empty floor, in daylight." },
  { title: "Choose rugs", text: "Stock sizes from the warehouse that ships to you." },
  { title: "See matches", text: "The rug sits in the photo at the foot-and-inch size you picked." },
];

export function RoomNotify() {
  const toast = useToast();

  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border border-line bg-card p-5">
            <p className="font-serif text-3xl leading-none text-accent">0{index + 1}</p>
            <h3 className="mt-4 font-serif text-h3">{step.title}</h3>
            <p className="mt-2 text-sm text-mute">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="relative mt-6 min-h-72 overflow-hidden bg-sand">
        <Image
          src="/images/photos/rug-persian.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover"
        />
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14110e]/80 to-transparent px-6 pt-16 pb-6 font-serif text-3xl text-[#f6f1e8]">
          Room preview is coming soon
        </p>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink bg-ink px-4 text-bg"
        onClick={() => toast("You're on the list. We'll write when room preview opens.")}
      >
        Notify me
      </button>
    </div>
  );
}
