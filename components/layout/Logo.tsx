import Link from "next/link";
import type { LogoVariant } from "@/types";
import { cn } from "@/lib/utils/cn";

const warps = [6, 12, 18, 24];
const wefts = [7, 12, 17, 22, 27];

function WeaveMark({ accent, className }: { accent: string; className?: string }) {
  const overs = wefts.flatMap((y, row) =>
    warps.filter((_, column) => (row + column) % 2 === 0).map((x) => ({ x, y })),
  );

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {warps.map((x) => (
        <line
          key={`warp-${x}`}
          x1={x}
          y1="3"
          x2={x}
          y2="29"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}
      {wefts.map((y) =>
        warps.slice(0, -1).map((x, index) => (
          <line
            key={`weft-${y}-${x}`}
            x1={x}
            y1={y}
            x2={warps[index + 1]}
            y2={y}
            stroke={accent}
            strokeWidth="1.6"
          />
        )),
      )}
      {overs.map((point) => (
        <line
          key={`over-${point.x}-${point.y}`}
          x1={point.x}
          y1={point.y - 2.5}
          x2={point.x}
          y2={point.y + 2.5}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const onDark = variant === "light-on-dark";

  return (
    <Link
      href="/"
      aria-label="Wool & Loom home"
      className={cn("inline-flex items-center gap-3 text-ink", onDark && "text-[#f1ebe0]", className)}
    >
      <WeaveMark accent={onDark ? "#d08b78" : "var(--accent)"} />
      {variant === "mark" ? null : (
        <span className="flex flex-col">
          <span className="font-serif text-[18px] font-semibold leading-none tracking-[0.14em]">
            WOOL & LOOM
          </span>
          <span
            className={cn(
              "mt-1 text-[9px] leading-none tracking-[0.32em]",
              onDark ? "text-[#a79d8c]" : "text-mute",
            )}
          >
            TURKISH RUGS · HOME · CARE
          </span>
        </span>
      )}
    </Link>
  );
}
