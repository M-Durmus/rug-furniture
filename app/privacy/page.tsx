import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "How Wool & Loom handles the details you type into a quote form. No payment data is collected yet.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <h1 className="font-serif text-5xl">Privacy</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>Quote and account forms on this site stay in your browser. They are not sent to a server and they are not sold.</p>
        <p>The cart is stored in local storage on your device under the key wool-loom-cart. Clearing the browser data removes it.</p>
        <p>A theme choice is stored the same way, so the next visit can open in light or dark. We do not use it to identify you.</p>
        <p>When checkout is connected, the privacy notice will name the payment company and the fields they receive. We do not collect card numbers today.</p>
      </div>
    </Container>
  );
}
