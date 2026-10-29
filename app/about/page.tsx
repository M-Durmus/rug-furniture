import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { warehouses } from "@/lib/data/facets";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Wool & Loom sells Turkish rugs and furniture from four U.S. warehouses and quotes rug care from the same buildings.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <h1 className="max-w-3xl text-h1">About Wool & Loom</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          We sell Turkish rugs we already hold in the United States, and furniture chosen to sit
          with them. A listing is a piece in a warehouse, not a preorder from a workshop overseas.
        </p>
        <p>
          The work started with wool that was knotted in Turkey and then sat in American rooms long
          enough to need a wash, a repair, or a new size. Selling the rug and caring for it from the
          same building keeps that loop short.
        </p>
      </div>
      <section className="mt-12 max-w-3xl" aria-labelledby="heritage-heading">
        <h2 id="heritage-heading" className="font-serif text-h2">
          Turkish rug heritage
        </h2>
        <div className="mt-4 space-y-4 leading-7">
          <p>
            An Oushak is an open field and a soft dye, usually from western Turkey. A vintage piece
            is lower because it has been walked on. A kilim is flatweave, with no pile to crush
            under a chair. Persian-style medallions in this catalog are Turkish-made versions of
            that drawing, and the page says so.
          </p>
          <p>
            We write sizes in feet and inches because that is how the rooms are measured. The knot
            count and the dye story stay on the product page, next to the warehouse that actually
            has the rug.
          </p>
        </div>
      </section>
      <section className="mt-12" aria-labelledby="warehouse-heading">
        <h2 id="warehouse-heading" className="font-serif text-h2">
          Our warehouses
        </h2>
        <p className="mt-4 max-w-3xl">
          Four buildings hold the stock and the care work. The product page names the one that has
          the piece and the delivery window from that building.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {warehouses.map((warehouse) => (
            <li key={warehouse.id} className="border border-line bg-card p-4">
              <h3 className="font-medium">{warehouse.name}</h3>
              <p className="mt-2">
                {warehouse.street}
                <br />
                {warehouse.city}, {warehouse.region} {warehouse.postalCode}
                <br />
                <a className="underline underline-offset-4" href={`tel:${warehouse.phone}`}>
                  {warehouse.phone}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12 max-w-3xl" aria-labelledby="team-heading">
        <h2 id="team-heading" className="font-serif text-h2">
          Service team
        </h2>
        <p className="mt-4 leading-7">
          The care desk at each warehouse quotes cleaning, repair, custom sizing, and pickup. They
          work from the size, the fiber, and the city. There is no public price list for that work,
          and this page does not name individual staff. Write through the contact form or the phone
          on the warehouse card.
        </p>
      </section>
    </Container>
  );
}
