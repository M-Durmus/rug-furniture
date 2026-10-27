"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const QuoteModal = dynamic(() => import("@/components/ui/QuoteModal"), { ssr: false });

export function QuoteButton({ intent, city, showDimensions = false }: { intent: string; city?: string; showDimensions?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground" onClick={() => setOpen(true)}>
        Request a quote
      </button>
      {open ? <QuoteModal intent={intent} city={city} showDimensions={showDimensions} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
