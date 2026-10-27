import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Cart",
  description: "Review rugs and furniture saved in your Wool & Loom cart. This page is not indexed.",
  path: "/cart",
  index: false,
});

export default function CartPage() {
  return (
    <Container className="py-10">
      <h1 className="font-serif text-5xl">Cart</h1>
      <div className="mt-6">
        <CartView />
      </div>
    </Container>
  );
}
