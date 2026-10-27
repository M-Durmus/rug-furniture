import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-[2px] border border-line bg-card px-3 text-[15px] text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
