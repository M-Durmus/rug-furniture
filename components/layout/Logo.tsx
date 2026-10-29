import Image from "next/image";
import Link from "next/link";
import type { LogoVariant } from "@/types";
import { cn } from "@/lib/utils/cn";

const full = { src: "/images/logo.png", width: 875, height: 151 };
const light = { src: "/images/logo-light.png", width: 875, height: 151 };
const mark = { src: "/images/logo-mark.png", width: 302, height: 151 };

export function Logo({
  variant = "full",
  className,
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const asset = variant === "mark" ? mark : variant === "light-on-dark" ? light : full;

  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src={asset.src}
        alt="Wool & Loom"
        width={asset.width}
        height={asset.height}
        unoptimized
        priority={variant !== "light-on-dark"}
        className={cn(
          "w-auto",
          variant === "mark" ? "h-9" : "h-8 sm:h-10",
          variant !== "light-on-dark" && "logo-on-theme",
        )}
      />
    </Link>
  );
}
