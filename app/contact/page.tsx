import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { warehouses } from "@/lib/data/facets";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, email, or write Wool & Loom. Warehouses are in New Jersey, Georgia, Texas, and California.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <h1 className="text-h1">Contact</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="write-heading">
          <h2 id="write-heading" className="font-serif text-h2">
            Write to the desk
          </h2>
          <p className="mt-3">
            Use this for a stock question, a trade note, or a care quote. The form stays in this
            browser.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </section>
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="font-serif text-h2">
            Desk and warehouses
          </h2>
          <p className="mt-3">
            Email{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <br />
            Phone{" "}
            <a className="underline underline-offset-4" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>
          </p>
          <ul className="mt-6 space-y-4">
            {warehouses.map((warehouse) => (
              <li key={warehouse.id}>
                <h3 className="font-medium">{warehouse.name}</h3>
                <p>
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
      </div>
    </Container>
  );
}
