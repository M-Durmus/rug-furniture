import { CheckoutView } from "@/components/cart/CheckoutView";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Request a Wool & Loom order. Payment is not collected on this site yet.",
  path: "/checkout",
  index: false,
});

export default function CheckoutPage() {
  return (
    <Container className="py-10">
      <h1 className="font-serif text-5xl">Checkout</h1>
      <p className="mt-4 max-w-2xl">This is a request, not a charge. We will not ask for a card number until payment is connected.</p>
      <div className="mt-6">
        <CheckoutView />
      </div>
    </Container>
  );
}
