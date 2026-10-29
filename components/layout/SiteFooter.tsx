import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/rugs", label: "Rugs" },
      { href: "/furniture", label: "Furniture" },
      { href: "/rugs/size/8x10", label: "8×10 rugs" },
      { href: "/rugs/style/oushak", label: "Oushak" },
      { href: "/room-preview", label: "Room preview" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/rug-cleaning", label: "Rug cleaning" },
      { href: "/services/rug-repair", label: "Rug repair" },
      { href: "/services/custom-sizing", label: "Custom sizing" },
      { href: "/services/pickup-and-delivery", label: "Pickup and delivery" },
    ],
  },
  {
    title: "Trade",
    links: [
      { href: "/trade-program", label: "Trade program" },
      { href: "/contact", label: "Talk to the desk" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help", label: "Help" },
      { href: "/help/shipping", label: "Shipping" },
      { href: "/help/returns", label: "Returns" },
      { href: "/faq", label: "Questions" },
      { href: "/contact", label: "Contact" },
      { href: "/guides/measure-for-a-rug", label: "Measure for a rug" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Journal" },
      { href: "/inspiration", label: "Inspiration" },
      { href: "/reviews", label: "Reviews" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

const social = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.pinterest.com/", label: "Pinterest" },
  { href: "https://www.facebook.com/", label: "Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-[3px] border-accent bg-[color-mix(in_srgb,var(--accent)_10%,var(--card))] text-ink">
      <Container className="py-12">
        <Logo />
        <p className="mt-4 max-w-md text-sm text-mute">Handpicked in Turkey. Delivered from America.</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-5">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-serif text-h3 text-accent">{column.title}</h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center underline decoration-accent/40 underline-offset-4 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 max-w-md border border-line bg-card p-5">
          <h2 className="font-serif text-h3 text-accent">10% off your first order</h2>
          <p className="mt-2 text-sm text-mute">Join the list. One note, no weekly blast.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Payment methods">
          {["Visa", "Mastercard", "Amex", "PayPal"].map((name) => (
            <li
              key={name}
              className="inline-flex h-8 items-center rounded-[2px] border border-accent/30 bg-card px-2 text-xs tracking-wide text-ink"
            >
              {name}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-4">
          {social.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex min-h-10 items-center underline decoration-accent/40 underline-offset-4 hover:text-accent"
                rel="noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-mute">
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>
          {" · "}
          <a href={`tel:${site.phone}`} className="underline underline-offset-4">
            {site.phoneDisplay}
          </a>
        </p>
        <p className="mt-2 text-sm text-mute">© 2026 Wool & Loom. Prices in USD. Sizes in feet and inches.</p>
      </Container>
    </footer>
  );
}
