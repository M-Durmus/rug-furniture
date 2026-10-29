"use client";

import { useState, type ReactNode } from "react";
import { Drawer } from "@/components/ui/Drawer";

export function FilterDrawer({ count, children }: { count: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-10 items-center rounded-[2px] border border-ink px-4 text-sm"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        Filters{count > 0 ? ` (${count})` : ""}
      </button>
      {open ? (
        <Drawer title="Filters" onClose={() => setOpen(false)}>
          <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto pr-1">{children}</div>
        </Drawer>
      ) : null}
    </>
  );
}
