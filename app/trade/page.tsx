import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Trade program",
  description: "Wool & Loom trade terms for designers and retailers. Rugs and furniture ship from our own U.S. warehouses.",
  path: "/trade",
});

export default function TradePage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Trade program", path: "/trade" }]} />
      <h1 className="font-serif text-5xl">Trade program</h1>
      <p className="mt-4 max-w-2xl">
        Designers and retailers order from the same stock in New Jersey, Georgia, Texas, and California. Tell us the business name and where you work, and the desk will reply with terms. There is no separate warehouse for trade.
      </p>
      <p className="mt-6">
        <Link href="/contact" className="underline underline-offset-4">
          Contact the trade desk
        </Link>
      </p>
    </Container>
  );
}
