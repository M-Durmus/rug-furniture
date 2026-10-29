import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Returns",
  description:
    "Unused Wool & Loom rugs can be returned within 100 days. Custom-cut rugs cannot be returned.",
  path: "/help/returns",
});

export default function HelpReturnsPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Help", path: "/help" },
          { name: "Returns", path: "/help/returns" },
        ]}
      />
      <h1 className="text-h1">Returns</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          An unused rug, in the condition we delivered, can come back within 100 days. Write to the
          desk with the order number and the warehouse that shipped it.
        </p>
        <p>Return freight is quoted. It is not deducted as a flat fee on this page.</p>
        <p>
          A rug we cut and bound to a custom size cannot be returned. A swatch is not a returnable
          product. Rug care, once the wash or the repair has started, is not undone.
        </p>
        <p>
          Furniture returns follow the same unused-condition rule when the piece can be carried back
          out. Placement that required a quoted carry is quoted again on the way out.
        </p>
        <p>
          <Link href="/contact" className="underline underline-offset-4">
            Start a return with the desk
          </Link>
        </p>
      </div>
    </Container>
  );
}
