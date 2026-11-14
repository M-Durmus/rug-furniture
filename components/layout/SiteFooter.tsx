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
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 2.5h9a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5zm9 1.8h-9a3.2 3.2 0 0 0-3.2 3.2v9a3.2 3.2 0 0 0 3.2 3.2h9a3.2 3.2 0 0 0 3.2-3.2v-9a3.2 3.2 0 0 0-3.2-3.2zM12 8.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm0 1.8a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zm5.05-2.55a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"
      />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2C6.7 2.2 2.4 6.4 2.4 11.6c0 4 2.2 7.4 5.4 8.9-.1-.7-.1-1.8.1-2.6.2-.8 1.4-5.6 1.4-5.6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.3 1.1.6 2.1 1.7 2.1 2 0 3.4-2.6 3.4-5.6 0-2.3-1.6-4-4.4-4-3.2 0-5.2 2.4-5.2 5 0 .9.3 1.9.7 2.4a.3.3 0 0 1 .1.3l-.3 1.1c0 .2-.1.2-.3.1-1.1-.5-1.6-1.8-1.6-3.2 0-2.6 2.2-5.8 6.6-5.8 3.5 0 5.8 2.5 5.8 5.3 0 3.6-2 6.3-5 6.3-1 0-1.9-.5-2.3-1.2l-.6 2.4a10 10 0 0 1-1.2 2.5c1 .3 2.1.5 3.2.5 5.3 0 9.6-4.2 9.6-9.4S17.3 2.2 12 2.2z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.4 21v-7.1h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.4 1.4-1.4H17V5.2c-.3-.1-1.2-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8v2.2H8.5v2.8h2.6V21h3.3z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M22.5 12.2s0-3-.4-4.4c-.2-.9-.9-1.6-1.8-1.8C18.8 5.6 12 5.6 12 5.6s-6.8 0-8.3.4c-.9.2-1.6.9-1.8 1.8C1.5 9.2 1.5 12.2 1.5 12.2s0 3 .4 4.4c.2.9.9 1.6 1.8 1.8 1.5.4 8.3.4 8.3.4s6.8 0 8.3-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.4.4-4.4zM9.9 15.4V9l5.8 3.2-5.8 3.2z"
      />
    </svg>
  );
}

function TikTokIcon() {
  const note =
    "M14.6 3.2c.5 2.5 2.1 4.3 4.5 4.8v2.4a7.2 7.2 0 0 1-4.3-1.4v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .5 0 .8.1v2.6a3 3 0 1 0 2.1 2.9V3.2h2.5z";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#25F4EE" d={note} transform="translate(-0.8 0.45)" />
      <path fill="#FE2C55" d={note} transform="translate(0.8 -0.35)" />
      <path fill="#fff" d={note} />
    </svg>
  );
}

const social = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: InstagramIcon,
    className: "bg-[linear-gradient(145deg,#f9ce34,#ee2a7b_55%,#6228d7)]",
  },
  { href: "https://www.pinterest.com/", label: "Pinterest", icon: PinterestIcon, className: "bg-[#e60023]" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: FacebookIcon, className: "bg-[#1877f2]" },
  { href: "https://www.youtube.com/", label: "YouTube", icon: YouTubeIcon, className: "bg-[#ff0033]" },
  { href: "https://www.tiktok.com/", label: "TikTok", icon: TikTokIcon, className: "bg-[#111111]" },
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
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-[2px] text-white shadow-[0_8px_18px_rgba(23,22,20,0.16)] transition-transform hover:-translate-y-0.5 ${link.className}`}
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
