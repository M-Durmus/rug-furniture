import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { warehouses } from "@/lib/data/facets";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "Wool & Loom sells Turkish rugs and furniture from four U.S. warehouses and quotes rug care from those same buildings.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <h1 className="font-serif text-5xl">About Wool & Loom</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>We sell Turkish rugs we already hold in the United States, and furniture chosen to sit with them. Nothing on the rug pages is a preorder from a workshop overseas.</p>
        <p>The same warehouses wash, repair, and bind rugs. Those services are quoted after we see the piece, because a price per square foot would ignore dye, fringe, and how the rug has been used.</p>
        <p>Sizes are written in feet and inches. Prices are in U.S. dollars. We deliver inside the United States only.</p>
      </div>
      <h2 className="mt-10 font-serif text-3xl">Warehouses</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {warehouses.map((warehouse) => (
          <li key={warehouse.id} className="border border-line p-4">
            <h3 className="font-medium">{warehouse.name}</h3>
            <p>
              {warehouse.street}
              <br />
              {warehouse.city}, {warehouse.region} {warehouse.postalCode}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
