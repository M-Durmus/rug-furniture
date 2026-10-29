import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accessibility",
  description:
    "How Wool & Loom builds pages for keyboard, focus, and text. Write if a page blocks you.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Accessibility", path: "/accessibility" },
        ]}
      />
      <h1 className="text-h1">Accessibility</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Pages use headings in order, visible focus, and labels on fields. Errors on forms are
          announced next to the field. A control that does nothing yet, such as the room-photo
          upload, is disabled and named as coming soon.
        </p>
        <p>
          Rug drawings stand in until photographs are on the product. When a photo is missing, the
          drawing still has a text alternative. Decorative marks are hidden from the accessibility
          tree.
        </p>
        <p>
          Color is not the only way a choice is shown. A selected filter uses text and a pressed or
          current state, not color alone.
        </p>
        <p>
          If a page blocks you, email{" "}
          <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact form
          </Link>
          . Say the address of the page and what you were trying to do. We will answer that note the
          same way we answer a stock question.
        </p>
      </div>
    </Container>
  );
}
