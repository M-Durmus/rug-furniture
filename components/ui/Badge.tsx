import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const tones = {
  neutral: "bg-sand text-ink",
  accent: "bg-accent text-bg",
  success: "bg-success text-bg",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
