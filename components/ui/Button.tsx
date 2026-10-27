import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "outline" | "link";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-bg hover:opacity-90",
  outline: "border-ink bg-transparent text-ink hover:bg-sand",
  link: "border-transparent bg-transparent px-0 text-ink underline underline-offset-4 hover:text-accent",
};

const base =
  "inline-flex min-h-10 items-center justify-center rounded-[2px] border px-4 text-[15px] font-medium leading-none transition-colors disabled:pointer-events-none disabled:opacity-50";

type Common = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

function sharedClass(variant: Variant | undefined, className: string | undefined) {
  return cn(base, variants[variant ?? "primary"], className);
}

export function Button(props: ButtonProps | LinkProps) {
  if ("href" in props && typeof props.href === "string") {
    const { href, variant, className, children, ...rest } = props;
    return (
      <Link href={href} className={sharedClass(variant, className)} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, className, children, type = "button", ...rest } = props as ButtonProps;
  return (
    <button type={type} className={sharedClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}
