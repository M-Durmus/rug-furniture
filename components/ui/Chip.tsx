import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
};

export function Chip({ pressed, onPressedChange, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "inline-flex min-h-8 items-center rounded-[2px] border px-3 text-sm",
        pressed ? "border-ink bg-ink text-bg" : "border-line bg-card text-ink hover:bg-sand",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
