import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Shipping and returns",
  description:
    "Wool & Loom freight is free on rugs. Unused pieces can be returned within 100 days.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Shipping and returns", path: "/shipping" },
        ]}
      />
      <h1 className="text-h1">Shipping and returns</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Standard freight is free on rugs inside the continental United States. The rug ships
          rolled from the warehouse named on its page.
        </p>
        <p>
          Furniture, stairs, and in-home placement are quoted. We need the floor number and whether
          there is an elevator before we book a truck.
        </p>
        <p>
          Unused rugs in the condition we delivered can come back within 100 days. Return freight is
          quoted. A rug we cut to a custom size cannot be returned.
        </p>
        <p>We do not ship outside the United States.</p>
        <p>
          <Link href="/help/shipping" className="underline underline-offset-4">
            Shipping details
          </Link>
          {" · "}
          <Link href="/help/returns" className="underline underline-offset-4">
            Return details
          </Link>
        </p>
      </div>
    </Container>
  );
}
