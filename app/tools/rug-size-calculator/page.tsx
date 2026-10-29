import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RugSizeCalculator } from "@/components/tools/RugSizeCalculator";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Rug size calculator",
  description:
    "Enter a room in feet. Wool & Loom suggests the largest stock rug that leaves a bare-floor border: 2 ft in a living room, 1.5 ft in a bedroom, 3 ft in a dining room.",
  path: "/tools/rug-size-calculator",
});

export default function RugSizeCalculatorPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug size calculator", path: "/tools/rug-size-calculator" },
        ]}
      />
      <h1 className="max-w-3xl text-h1">Rug size calculator</h1>
      <p className="mt-4 max-w-2xl">
        Measure the clear floor in feet. The calculator keeps a border of bare floor and picks the
        largest stock size that still fits. Custom cutting is a separate quote.
      </p>
      <RugSizeCalculator />
    </Container>
  );
}
