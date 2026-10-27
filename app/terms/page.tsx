import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms for browsing Wool & Loom. Orders are not completed and payments are not taken on this site yet.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
      <h1 className="font-serif text-5xl">Terms</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>Catalog prices are in U.S. dollars and describe stock held in our warehouses. A listing can sell through before a request is confirmed.</p>
        <p>Adding a piece to the cart does not reserve it. Checkout on this site records a request on your device and does not take payment.</p>
        <p>Care services are quoted. A quote is not a contract until both sides accept the size, the city, and the price in writing.</p>
        <p>These pages are for customers in the United States. Sizes are in feet and inches.</p>
      </div>
    </Container>
  );
}
