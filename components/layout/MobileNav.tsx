"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { ServiceLink } from "@/components/layout/chrome";

const links = [
  { href: "/rugs", label: "Rugs" },
  { href: "/furniture", label: "Furniture" },
  { href: "/services", label: "Services" },
  { href: "/room-preview", label: "Room preview" },
  { href: "/trade", label: "Trade program" },
  { href: "/blog", label: "Journal" },
  { href: "/account", label: "Account" },
];

export function MobileNav({
  open,
  services,
  onClose,
  onSearch,
}: {
  open: boolean;
  services: ServiceLink[];
  onClose: () => void;
  onSearch: () => void;
}) {
  if (!open) return null;

  return (
    <Drawer title="Menu" onClose={onClose}>
      <nav aria-label="Mobile" className="mt-2">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="flex min-h-12 items-center border-b border-line" onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-6 text-sm font-medium">Services</h3>
        <ul className="mt-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="flex min-h-12 items-center" onClick={onClose}>
                {service.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="flex min-h-12 items-center underline underline-offset-4" onClick={onClose}>
              Request a quote
            </Link>
          </li>
        </ul>
        <button type="button" className="mt-4 inline-flex min-h-12 items-center underline underline-offset-4" onClick={onSearch}>
          Search
        </button>
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </nav>
    </Drawer>
  );
}
