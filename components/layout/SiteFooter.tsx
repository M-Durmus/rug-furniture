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

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="2.25" y="2.25" width="13.5" height="13.5" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12.7" cy="5.3" r="0.7" fill="currentColor" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7.7 13.6 V6.2 H10.1 A1.9 1.9 0 0 1 10.1 10 H7.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M10.4 15.2 V9.7 H12.2 L12.5 7.6 H10.4 V6.3 C10.4 5.7 10.6 5.3 11.5 5.3 H12.6 V3.4 C12.4 3.4 11.7 3.3 10.9 3.3 C9.1 3.3 7.9 4.4 7.9 6.1 V7.6 H6.2 V9.7 H7.9 V15.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const social = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: InstagramIcon,
    className: "bg-[linear-gradient(135deg,#fccc63,#f77737_28%,#e1306c_58%,#833ab4)]",
  },
  { href: "https://www.pinterest.com/", label: "Pinterest", icon: PinterestIcon, className: "bg-[#e60023]" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: FacebookIcon, className: "bg-[#1877f2]" },
];

function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" className="h-4 w-12" aria-hidden="true">
      <text x="1" y="13" fill="#1a1f71" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fontWeight="700">
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 36 22" className="h-5 w-8" aria-hidden="true">
      <circle cx="13" cy="11" r="7" fill="#eb001b" />
      <circle cx="23" cy="11" r="7" fill="#f79e1b" />
      <path d="M18 5.7 A7 7 0 0 1 18 16.3 A7 7 0 0 1 18 5.7" fill="#ff5f00" />
    </svg>
  );
}

function AmexMark() {
  return (
    <svg viewBox="0 0 48 18" className="h-4 w-12" aria-hidden="true">
      <rect width="48" height="18" fill="#2e77bc" />
      <text x="24" y="12.5" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">
        AMEX
      </text>
    </svg>
  );
}

function PayPalMark() {
  return (
    <svg viewBox="0 0 62 16" className="h-4 w-14" aria-hidden="true">
      <text x="0" y="13" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fontWeight="700">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009cde">Pal</tspan>
      </text>
    </svg>
  );
}

const payments = [
  { name: "Visa", mark: VisaMark },
  { name: "Mastercard", mark: MastercardMark },
  { name: "American Express", mark: AmexMark },
  { name: "PayPal", mark: PayPalMark },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-bg text-ink">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <Logo imageClassName="h-12 sm:h-16" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-mute">
              Handpicked in Turkey. Delivered from America.
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Social">
              {social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className={`inline-flex h-11 w-11 items-center justify-center text-white transition-transform hover:-translate-y-0.5 ${link.className}`}
                    rel="noreferrer"
                  >
                    <link.icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="offer-frame">
            <div className="bg-sand px-5 py-6 sm:px-8 sm:py-8">
              <h2 className="font-serif text-h3">
                <span className="text-accent">10%</span> off your first order
              </h2>
              <p className="mt-2 text-sm text-mute">Join the list. One note, no weekly blast.</p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-mute uppercase">{column.title}</p>
              <ul className="mt-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-10 items-center text-sm hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {payments.map((method) => (
              <li key={method.name}>
                <span
                  role="img"
                  aria-label={method.name}
                  className="inline-flex h-9 min-w-14 items-center justify-center border border-line bg-card px-2.5"
                >
                  <method.mark />
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-mute">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${site.phone}`} className="hover:text-accent">
              {site.phoneDisplay}
            </a>
          </p>
        </Container>
        <Container className="pb-8">
          <p className="text-sm text-mute">© 2026 Wool & Loom. Prices in USD. Sizes in feet and inches.</p>
        </Container>
      </div>
    </footer>
  );
}
