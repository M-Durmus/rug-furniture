"use client";

import { useEffect, useId, useRef } from "react";

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let disposed = false;
    const handleClose = () => {
      if (!disposed) onCloseRef.current();
    };
    if (!dialog.open) dialog.showModal();
    dialog.addEventListener("close", handleClose);
    return () => {
      disposed = true;
      dialog.removeEventListener("close", handleClose);
      if (dialog.open) {
        dialog.addEventListener("close", (event) => event.stopImmediatePropagation(), { once: true });
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="w-[min(40rem,calc(100%-2rem))] rounded-[2px] border border-line bg-card p-6 text-ink"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id={titleId} className="font-serif text-h3">
          {title}
        </h2>
        <button type="button" className="inline-flex min-h-10 items-center rounded-[2px] border border-line px-4" onClick={() => ref.current?.close()}>
          Close
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </dialog>
  );
}
