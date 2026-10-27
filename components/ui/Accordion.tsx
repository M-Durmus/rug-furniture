import type { ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.title} className="group border-b border-line">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-ink">
            {item.title}
            <span aria-hidden="true" className="text-mute transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pb-4 leading-6 text-mute">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
