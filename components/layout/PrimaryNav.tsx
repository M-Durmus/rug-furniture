"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { RugArt } from "@/components/media/RugArt";
import type { ServiceLink } from "@/components/layout/chrome";

const rooms = [
  { href: "/rugs/size/8x10", label: "Living room", note: "8×10" },
  { href: "/rugs/size/5x7", label: "Bedroom", note: "5×7" },
  { href: "/rugs/size/6x9", label: "Dining room", note: "6×9" },
  { href: "/rugs/size/2x8", label: "Hallway", note: "Runner" },
  { href: "/rugs/size/3x5", label: "Entry", note: "3×5" },
  { href: "/rugs/size/9x12", label: "Open seating", note: "9×12" },
];

const sizes = [
  { href: "/rugs/size/2x3", label: "2×3" },
  { href: "/rugs/size/3x5", label: "3×5" },
  { href: "/rugs/size/5x7", label: "5×7" },
  { href: "/rugs/size/6x9", label: "6×9" },
  { href: "/rugs/size/8x10", label: "8×10" },
  { href: "/rugs/size/9x12", label: "9×12" },
];

const styles = [
  { href: "/rugs/style/oushak", label: "Oushak" },
  { href: "/rugs/style/vintage", label: "Vintage" },
  { href: "/rugs/style/persian", label: "Persian-style" },
  { href: "/rugs/style/kilim", label: "Kilim" },
  { href: "/rugs/style/modern", label: "Modern" },
];

const colors = [
  { href: "/rugs/color/ivory", label: "Ivory", hex: "#e7dccb" },
  { href: "/rugs/color/blue", label: "Blue", hex: "#3e4c66" },
  { href: "/rugs/color/terracotta", label: "Terracotta", hex: "#a15b45" },
  { href: "/rugs/color/sage", label: "Sage", hex: "#8a9178" },
  { href: "/rugs/color/charcoal", label: "Charcoal", hex: "#2a2724" },
];

const furniture = [
  { href: "/furniture/sofas", label: "Sofas", text: "Six to eight feet wide, scaled for an 8 by 10 rug." },
  { href: "/furniture/coffee-tables", label: "Coffee tables", text: "Sized to sit fully on the rug in front of a sofa." },
  { href: "/furniture/accent-chairs", label: "Accent chairs", text: "Front legs meant to share the rug with the sofa." },
  { href: "/furniture/side-tables", label: "Side tables", text: "Small enough to sit on the rug beside a chair." },
];

type Panel = "rugs" | "size" | "room" | "style" | "color" | "furniture" | "services";
type Item = { id: string; label: string; href: string; panel?: Panel };

const items: Item[] = [
  { id: "rugs", label: "All rugs", href: "/rugs", panel: "rugs" },
  { id: "size", label: "Size", href: "/rugs/size/8x10", panel: "size" },
  { id: "room", label: "Room", href: "/rugs/size/8x10", panel: "room" },
  { id: "style", label: "Style", href: "/rugs/style/oushak", panel: "style" },
  { id: "color", label: "Color", href: "/rugs/color/ivory", panel: "color" },
  { id: "washable", label: "Washable", href: "/rugs/washable" },
  { id: "runners", label: "Runners", href: "/rugs/runner" },
  { id: "furniture", label: "Furniture", href: "/furniture", panel: "furniture" },
  { id: "services", label: "Rug care", href: "/services", panel: "services" },
  { id: "room-preview", label: "Room preview", href: "/room-preview" },
  { id: "trade", label: "Trade", href: "/trade-program" },
  { id: "journal", label: "Journal", href: "/blog" },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="mt-3 space-y-1">{children}</ul>
    </div>
  );
}

function ItemLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} data-menuitem="true" className="inline-flex min-h-10 items-center gap-2">
        {children}
      </Link>
    </li>
  );
}

function Menu({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={`mega-${id}`} className="absolute top-full right-0 left-0 z-40 border-b border-line bg-card">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-5">{children}</div>
    </div>
  );
}

export function PrimaryNav({ services }: { services: ServiceLink[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const triggers = useRef<Array<HTMLAnchorElement | null>>([]);
  const navRef = useRef<HTMLElement>(null);
  const pendingFocus = useRef(false);

  useEffect(() => {
    if (!pendingFocus.current || !open) return;
    pendingFocus.current = false;
    navRef.current?.querySelector<HTMLElement>(`#mega-${open} [data-menuitem]`)?.focus();
  }, [open]);

  function move(from: number, direction: number) {
    const next = (from + direction + items.length) % items.length;
    const item = items[next];
    triggers.current[next]?.focus();
    if (item?.panel) setOpen(item.id);
    else setOpen(null);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const active = document.activeElement;
    const triggerIndex = triggers.current.findIndex((node) => node === active);
    const current =
      triggerIndex >= 0
        ? triggerIndex
        : items.findIndex((item) => item.panel && navRef.current?.querySelector(`#mega-${item.id}`)?.contains(active));

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(null);
      if (current >= 0) triggers.current[current]?.focus();
      return;
    }

    if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && current >= 0) {
      event.preventDefault();
      move(current, event.key === "ArrowRight" ? 1 : -1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      triggers.current[0]?.focus();
      setOpen(items[0]?.panel ? items[0].id : null);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const last = items.length - 1;
      triggers.current[last]?.focus();
      setOpen(null);
      return;
    }

    if (event.key === "ArrowDown" && triggerIndex >= 0) {
      event.preventDefault();
      const item = items[triggerIndex];
      if (!item?.panel) return;
      if (open === item.id) {
        navRef.current?.querySelector<HTMLElement>(`#mega-${item.id} [data-menuitem]`)?.focus();
        return;
      }
      pendingFocus.current = true;
      setOpen(item.id);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const panel = navRef.current?.querySelector<HTMLElement>(`#mega-${open}`);
      const links = panel ? Array.from(panel.querySelectorAll<HTMLElement>("[data-menuitem]")) : [];
      const index = links.findIndex((node) => node === active);
      if (index === -1) return;
      event.preventDefault();
      if (event.key === "ArrowUp" && index === 0 && current >= 0) {
        triggers.current[current]?.focus();
        return;
      }
      const next = event.key === "ArrowDown" ? Math.min(index + 1, links.length - 1) : Math.max(index - 1, 0);
      links[next]?.focus();
    }
  }

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="relative flex h-11 min-w-0 border-t border-line"
      onKeyDown={onKeyDown}
      onMouseLeave={() => setOpen(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
      }}
    >
      <ul className="mx-auto flex w-full max-w-[1180px] items-center gap-0.5 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <li key={item.id} className="shrink-0" onMouseEnter={() => setOpen(item.panel ? item.id : null)}>
            <Link
              ref={(node) => {
                triggers.current[index] = node;
              }}
              href={item.href}
              aria-expanded={item.panel ? open === item.id : undefined}
              aria-controls={item.panel ? `mega-${item.id}` : undefined}
              aria-haspopup={item.panel ? "true" : undefined}
              className="inline-flex h-9 items-center gap-1 rounded-[2px] px-2.5 text-sm whitespace-nowrap"
            >
              {item.label}
              {item.panel ? (
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      {open === "rugs" ? (
        <div id="mega-rugs" className="absolute top-full right-0 left-0 z-40 pt-1">
          <div className="border-b border-line bg-card text-ink">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-6 px-5 py-6 md:grid-cols-3 lg:grid-cols-5">
            <Column title="Shop by Room">
              {rooms.map((link) => (
                <ItemLink key={link.href} href={link.href}>
                  {link.label}
                  <span className="text-mute">{link.note}</span>
                </ItemLink>
              ))}
            </Column>
            <Column title="Shop by Size">
              {sizes.map((link) => (
                <ItemLink key={link.href} href={link.href}>
                  {link.label}
                </ItemLink>
              ))}
            </Column>
            <Column title="Shop by Style">
              {styles.map((link) => (
                <ItemLink key={link.href} href={link.href}>
                  {link.label}
                </ItemLink>
              ))}
            </Column>
            <Column title="Shop by Color">
              {colors.map((link) => (
                <ItemLink key={link.href} href={link.href}>
                  <span className="h-3 w-3 border border-line" style={{ background: link.hex }} aria-hidden="true" />
                  {link.label}
                </ItemLink>
              ))}
            </Column>
            <Link href="/rugs/style/oushak" data-menuitem="true" className="block bg-sand p-4">
              <RugArt colors={["#e7dccb", "#c4896a", "#8a9178"]} style="medallion" label="" className="h-28 w-full" />
              <p className="mt-3 font-serif text-h3">Oushak</p>
              <p className="mt-1 text-sm text-mute">Pale fields and open medallions, in stock in the U.S.</p>
            </Link>
          </div>
          </div>
        </div>
      ) : null}
      {open === "size" ? (
        <Menu id="size">
          <ul className="flex flex-wrap gap-2">
            {sizes.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-menuitem="true"
                  className="inline-flex min-h-10 items-center border border-line px-3 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      ) : null}
      {open === "room" ? (
        <Menu id="room">
          <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((link) => (
              <ItemLink key={link.href} href={link.href}>
                {link.label}
                <span className="text-mute">{link.note}</span>
              </ItemLink>
            ))}
          </ul>
        </Menu>
      ) : null}
      {open === "style" ? (
        <Menu id="style">
          <ul className="flex flex-wrap gap-2">
            {styles.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-menuitem="true"
                  className="inline-flex min-h-10 items-center border border-line px-3 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      ) : null}
      {open === "color" ? (
        <Menu id="color">
          <ul className="flex flex-wrap gap-2">
            {colors.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-menuitem="true"
                  className="inline-flex min-h-10 items-center gap-2 border border-line px-3 text-sm"
                >
                  <span className="h-3 w-3 border border-line" style={{ background: link.hex }} aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      ) : null}
      {open === "furniture" ? (
        <div id="mega-furniture" className="absolute top-full right-0 left-0 z-40 pt-1">
          <div className="border-b border-line bg-card">
          <ul className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-4 px-5 py-6 lg:grid-cols-4">
            {furniture.map((link) => (
              <li key={link.href}>
                <Link href={link.href} data-menuitem="true" className="block min-h-10">
                  <span className="font-medium">{link.label}</span>
                  <span className="mt-1 block text-sm text-mute">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      ) : null}
      {open === "services" ? (
        <div id="mega-services" className="absolute top-full right-0 left-0 z-40 pt-1">
          <div className="border-b border-line bg-card">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-6">
          <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} data-menuitem="true" className="block min-h-10">
                  <span className="font-medium">{service.name}</span>
                  <span className="mt-1 block text-sm text-mute">{service.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" data-menuitem="true" className="mt-4 inline-flex min-h-10 items-center underline underline-offset-4">
            Request a quote
          </Link>
          </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
