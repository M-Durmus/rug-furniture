import Link from "next/link";

const styles = {
  primary: "inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground",
  secondary: "inline-flex min-h-12 items-center justify-center rounded-[2px] border border-line bg-surface px-5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link href={href} className={styles[variant]}>
      {children}
    </Link>
  );
}
