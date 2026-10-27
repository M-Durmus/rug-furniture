import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-[2px] border border-line bg-card p-4", className)} {...props}>
      {children}
    </div>
  );
}
