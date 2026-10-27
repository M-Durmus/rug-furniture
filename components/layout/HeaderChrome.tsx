"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchBar } from "@/components/layout/SearchBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CartToasts } from "@/components/layout/CartToasts";
import { Container } from "@/components/ui/Container";
import { iconButtonClass, type CartProductInfo, type SearchEntry, type ServiceLink } from "@/components/layout/chrome";
import { hydrateCart, useCartStore } from "@/lib/cart/store";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M9 15.5 C4 12 2 9.5 2 6.8 A3.2 3.2 0 0 1 9 6 A3.2 3.2 0 0 1 16 6.8 C16 9.5 14 12 9 15.5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 15.5 C4.2 12 6.3 10.5 9 10.5 C11.7 10.5 13.8 12 14.5 15.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 6 H14 L13 16 H5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6 V4.5 A2 2 0 0 1 11 4.5 V6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HeaderChrome({
  entries,
  products,
  services,
}: {
  entries: SearchEntry[];
  products: CartProductInfo[];
  services: ServiceLink[];
}) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<"search" | "cart" | "menu" | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOverlay(null);
  }
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);
  const count = hydrated ? items.reduce((sum, item) => sum + item.qty, 0) : 0;

  useEffect(() => {
    hydrateCart();
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-bg" data-header>
      <a href="#main" className="fixed top-0 left-5 z-50 -translate-y-full bg-ink px-4 py-3 text-bg focus:translate-y-4">
        Skip to content
      </a>
      <Container className="flex h-16 items-center gap-2">
        <span className="sm:hidden">
          <Logo variant="mark" />
        </span>
        <span className="hidden sm:contents">
          <Logo />
        </span>
        <PrimaryNav services={services} />
        <div className="ml-auto flex items-center gap-1">
          <button type="button" className={iconButtonClass} aria-label="Search" aria-expanded={overlay === "search"} onClick={() => setOverlay("search")}>
            <SearchIcon />
          </button>
          <Link href="/account" className={iconButtonClass} aria-label="Favorites">
            <HeartIcon />
          </Link>
          <Link href="/account" className={iconButtonClass} aria-label="Account">
            <AccountIcon />
          </Link>
          <button
            type="button"
            className={iconButtonClass}
            aria-label={count === 1 ? "Cart, 1 item" : `Cart, ${count} items`}
            aria-expanded={overlay === "cart"}
            onClick={() => setOverlay("cart")}
          >
            <BagIcon />
            {count > 0 ? (
              <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center bg-accent px-1 text-[10px] leading-none text-on-dark">
                {count > 9 ? "9+" : count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className={`${iconButtonClass} xl:hidden`}
            aria-label="Open menu"
            aria-expanded={overlay === "menu"}
            onClick={() => setOverlay("menu")}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 5 H15 M3 9 H15 M3 13 H15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </Container>
      {overlay === "search" ? <SearchBar open entries={entries} onClose={() => setOverlay(null)} /> : null}
      {overlay === "cart" ? <CartDrawer open products={products} onClose={() => setOverlay(null)} /> : null}
      {overlay === "menu" ? (
        <MobileNav open services={services} onClose={() => setOverlay(null)} onSearch={() => setOverlay("search")} />
      ) : null}
      <CartToasts />
    </header>
  );
}
