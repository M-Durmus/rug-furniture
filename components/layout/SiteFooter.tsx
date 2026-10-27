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
      { href: "/trade", label: "Trade program" },
      { href: "/contact", label: "Talk to the desk" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "Questions" },
      { href: "/shipping", label: "Shipping and returns" },
      { href: "/contact", label: "Contact" },
      { href: "/guides/measure-for-a-rug", label: "Measure for a rug" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Journal" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
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
    <footer className="mt-16 bg-dark text-on-dark [&_:focus-visible]:outline-[#d08b78]">
      <Container className="py-12">
        <Logo variant="light-on-dark" />
        <p className="mt-4 max-w-md text-sm text-[#a79d8c]">Handpicked in Turkey. Delivered from America.</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-5">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-serif text-h3 text-on-dark">{column.title}</h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-10 items-center underline underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 max-w-md">
          <h2 className="font-serif text-h3 text-on-dark">10% off your first order</h2>
          <p className="mt-2 text-sm text-[#a79d8c]">Join the list. One note, no weekly blast.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Payment methods">
          {["Visa", "Mastercard", "Amex", "PayPal"].map((name) => (
            <li key={name} className="inline-flex h-8 items-center rounded-[2px] border border-[#352f27] px-2 text-xs tracking-wide">
              {name}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-4">
          {social.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="inline-flex min-h-10 items-center underline underline-offset-4" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-[#a79d8c]">
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
        <p className="mt-2 text-sm text-[#a79d8c]">© 2026 Wool & Loom. Prices in USD. Sizes in feet and inches.</p>
      </Container>
    </footer>
  );
}
