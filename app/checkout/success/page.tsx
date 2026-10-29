import { Suspense } from "react";
import { SuccessView } from "@/components/checkout/SuccessView";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Order received",
  description: "Your Wool & Loom order number. This page is not indexed.",
  path: "/checkout/success",
  index: false,
});

export default function CheckoutSuccessPage() {
  return (
    <Container className="py-10 pb-16">
      <h1 className="text-h1">Order received</h1>
      <Suspense fallback={<p className="mt-6">Loading the order.</p>}>
        <SuccessView />
      </Suspense>
    </Container>
  );
}
