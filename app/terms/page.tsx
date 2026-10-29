import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms for browsing and requesting a Wool & Loom order. A card is not charged until Stripe is connected.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <h1 className="text-h1">Terms</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Catalog prices are in U.S. dollars and describe stock held in our warehouses. A listing
          can sell through before a request is confirmed. Adding a piece to the cart does not
          reserve it.
        </p>
        <p>
          Checkout records a request. Card payments will be connected to Stripe. Until that
          connection is live, placing an order does not charge a card. Estimated tax on the page is
          8 percent of the taxable amount, and shipping on rugs is free.
        </p>
        <p>
          Care services are quoted. A quote is not a contract until both sides accept the size, the
          city, and the price in writing. A custom cut cannot be undone and cannot be returned.
        </p>
        <p>
          Unused rugs can be returned within 100 days in the condition we delivered. Return freight
          is quoted.
        </p>
        <p>
          These pages are for customers in the United States. Sizes are in feet and inches. Trade
          accounts are accepted separately and do not change the public prices until the desk
          confirms the account.
        </p>
      </div>
    </Container>
  );
}
