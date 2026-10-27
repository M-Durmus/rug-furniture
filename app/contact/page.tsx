import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Wool & Loom about a rug, a piece of furniture, or a care quote. We reply by email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <h1 className="font-serif text-5xl">Contact</h1>
      <p className="mt-4 max-w-2xl">
        Call <a className="underline underline-offset-4" href={`tel:${site.phone}`}>{site.phoneDisplay}</a> or email{" "}
        <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>. The form stays on this device and does not call an outside service.
      </p>
      <div className="mt-6 max-w-xl">
        <InquiryForm intent="contact" />
      </div>
    </Container>
  );
}
