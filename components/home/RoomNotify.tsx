"use client";

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
          <li key={step.title} className="border border-line bg-card p-4">
            <p className="text-sm text-mute">Step {index + 1}</p>
            <h3 className="mt-1 font-serif text-h3">{step.title}</h3>
            <p className="mt-2 text-sm">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex min-h-40 items-center justify-center rounded-[2px] border border-dashed border-line bg-sand px-6 py-10 text-center">
        <p>Room preview is coming soon</p>
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
