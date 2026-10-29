import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Shipping",
  description:
    "Wool & Loom ships rugs free inside the continental United States from the warehouse named on the product page.",
  path: "/help/shipping",
});

export default function HelpShippingPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Help", path: "/help" },
          { name: "Shipping", path: "/help/shipping" },
        ]}
      />
      <h1 className="text-h1">Shipping</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Rugs ship rolled from Elizabeth, Fairburn, Grand Prairie, or Ontario. The product page
          names the building and a window such as 1–3 business days from the nearest warehouse.
        </p>
        <p>
          Standard freight on rugs is free inside the continental United States. There is no order
          minimum on that freight. A city farther from the warehouse can add a transit day. The
          local service pages say so.
        </p>
        <p>
          Stairs, a long carry, furniture placement, and white-glove delivery are quoted with pickup
          and delivery. Tell us the floor and whether there is an elevator before a truck is booked.
        </p>
        <p>
          We do not ship outside the United States. Sizes stay in feet and inches, and prices stay
          in U.S. dollars.
        </p>
        <p>
          <Link href="/services/pickup-and-delivery" className="underline underline-offset-4">
            Ask for a pickup and delivery quote
          </Link>
        </p>
      </div>
    </Container>
  );
}
