import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Shipping and returns",
  description: "Wool & Loom freight, white-glove delivery, and the 14-day return window for unused rugs.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Shipping and returns", path: "/shipping" }]} />
      <h1 className="font-serif text-5xl">Shipping and returns</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>Standard freight is free on rugs over $1,500 inside the continental United States. The rug ships rolled from the warehouse named on its page.</p>
        <p>Furniture, stairs, and in-home placement are quoted. We need the floor number and whether there is an elevator before we book a truck.</p>
        <p>Unused rugs in the condition we delivered can come back within 14 days. Return freight is quoted. A rug we cut to a custom size cannot be returned.</p>
        <p>We do not ship outside the United States.</p>
      </div>
    </Container>
  );
}
