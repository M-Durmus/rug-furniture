import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Checkout",
  description:
    "Place a Wool & Loom order. Card payments are not connected yet. This page is not indexed.",
  path: "/checkout",
  index: false,
});

export default function CheckoutPage() {
  return (
    <Container className="py-10 pb-16">
      <h1 className="text-h1">Checkout</h1>
      <p className="mt-4 max-w-2xl">
        This places a request. A card is not charged until Stripe is connected.
      </p>
      <CheckoutForm />
    </Container>
  );
}
