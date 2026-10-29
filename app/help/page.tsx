import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Help",
  description:
    "Shipping, returns, and common questions for Wool & Loom rugs, furniture, and quote-based rug care.",
  path: "/help",
});

const links = [
  {
    href: "/help/shipping",
    title: "Shipping",
    text: "Free freight on rugs, and what is quoted instead.",
  },
  {
    href: "/help/returns",
    title: "Returns",
    text: "The 100-day window, and what cannot come back.",
  },
  { href: "/help/faq", title: "Questions", text: "Warehouses, tax, care, and where we deliver." },
  { href: "/contact", title: "Contact", text: "Email, phone, and the four warehouse addresses." },
  {
    href: "/tools/rug-size-calculator",
    title: "Rug size calculator",
    text: "A stock size that leaves a border of bare floor.",
  },
];

export default function HelpPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Help", path: "/help" },
        ]}
      />
      <h1 className="text-h1">Help</h1>
      <p className="mt-4 max-w-2xl">
        Start here for freight, returns, and the questions that come up before a rug leaves the
        warehouse.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href} className="border border-line bg-card p-5">
            <h2 className="font-serif text-h3">
              <Link href={link.href} className="underline underline-offset-4">
                {link.title}
              </Link>
            </h2>
            <p className="mt-2">{link.text}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
