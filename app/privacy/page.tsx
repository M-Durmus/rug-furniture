import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "What Wool & Loom stores in this browser. Card numbers are not collected.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1 className="text-h1">Privacy</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Quote, trade, contact, and waitlist forms on this site are handled in this browser or
          logged as a local request. They are not sold. A card number is not collected. The payment
          line on checkout says card payments will be connected to Stripe, and that connection is
          not live.
        </p>
        <p>
          The catalog cart is stored under wool-loom-catalog-cart. An older cart key,
          wool-loom-cart, may still be on the device. Favorites use wool-loom-favorites. A coupon, a
          signed-in email, and the last order receipt use session storage and clear when the session
          ends. A theme choice and a dismissed announcement stay in local storage so the next visit
          can match them.
        </p>
        <p>
          Clearing site data for this browser removes those keys. We do not use them to build a
          profile.
        </p>
        <p>
          When Stripe is connected, this notice will name the fields that company receives. Until
          then, checkout records a request and does not charge a card.
        </p>
      </div>
    </Container>
  );
}
