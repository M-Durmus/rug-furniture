import { TradeForm } from "@/components/trade/TradeForm";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Trade program",
  description:
    "Trade pricing, free shipping with no minimum, and priority rug care booking for designers and retailers who buy Wool & Loom stock.",
  path: "/trade-program",
});

const benefits = [
  {
    title: "Trade pricing and volume discounts",
    text: "Accepted accounts see trade pricing on the same rugs and furniture already in our warehouses. A larger order can take a further discount. The rate is confirmed with the account, not printed as a public percent.",
  },
  {
    title: "Free shipping with no minimums",
    text: "Trade freight inside the continental United States has no order minimum. The piece still ships from the warehouse that holds it.",
  },
  {
    title: "Dedicated sales support",
    text: "One desk follows the project: stock checks, holds, and a second size if the first room changes. You are not put back in a general queue.",
  },
  {
    title: "Priority rug care booking",
    text: "Cleaning, repair, and custom sizing stay priced by quote. A trade account is booked ahead of a new public request for the same city.",
  },
];

const steps = [
  {
    title: "Send the application",
    text: "Business name, the kind of work you do, and a way to reach you. A resale certificate number is optional on this form.",
  },
  {
    title: "We confirm the business",
    text: "The desk checks that the work is in the United States and replies with the account terms.",
  },
  {
    title: "Order from the same stock",
    text: "You buy pieces we already hold in New Jersey, Georgia, Texas, or California. Care is still a separate quote.",
  },
];

const faqs = [
  {
    title: "Who should apply?",
    content:
      "Designers, retailers, architects, and stagers placing rugs or furniture in U.S. projects. A single homeowner order can go through the public site.",
  },
  {
    title: "Is there a minimum order?",
    content:
      "No. Free trade shipping does not require a dollar minimum. Volume discounts start when an order is large enough to warrant them, and we say so in the reply.",
  },
  {
    title: "Are care prices lower for trade?",
    content:
      "Care is still quoted from the size, the fiber, and the city. Priority booking means an earlier place in the schedule, not a published flat rate.",
  },
];

export default function TradeProgramPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trade program", path: "/trade-program" },
        ]}
      />
      <h1 className="max-w-3xl text-h1">Trade program</h1>
      <p className="mt-4 max-w-2xl text-lg">
        Designers and retailers order the same Turkish rugs and furniture we hold in the United
        States, with a desk that stays on the project.
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="border border-line bg-card p-5">
            <h2 className="font-serif text-h3">{benefit.title}</h2>
            <p className="mt-2">{benefit.text}</p>
          </li>
        ))}
      </ul>
      <section className="mt-14" aria-labelledby="apply-heading">
        <h2 id="apply-heading" className="font-serif text-h2">
          How to apply
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border border-line p-5">
              <p className="text-sm text-mute">Step {index + 1}</p>
              <h3 className="mt-2 font-serif text-h3">{step.title}</h3>
              <p className="mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <TradeForm />
        </div>
      </section>
      <section className="mt-14 max-w-3xl" aria-labelledby="trade-faq">
        <h2 id="trade-faq" className="font-serif text-h2">
          Questions
        </h2>
        <div className="mt-4">
          <Accordion items={faqs} />
        </div>
      </section>
    </Container>
  );
}
