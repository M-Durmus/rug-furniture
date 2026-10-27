import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[2px] border border-line bg-card px-3 text-[15px] text-ink placeholder:text-mute",
        className,
      )}
      {...props}
    />
  );
}
