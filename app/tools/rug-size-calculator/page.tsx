import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Rug size calculator",
  description:
    "Match a room measured in feet and inches to a Wool & Loom stock rug size, from 2 by 3 up to 10 by 14.",
  path: "/tools/rug-size-calculator",
});

const guides = [
  { size: "5×8", href: "/rugs/size/5x8", use: "A loveseat and one chair, or the foot of a queen bed." },
  { size: "8×10", href: "/rugs/size/8x10", use: "A standard sofa, two chairs, and a coffee table." },
  { size: "9×12", href: "/rugs/size/9x12", use: "An open seating group, or a table with six chairs." },
];

export default function RugSizeCalculatorPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug size calculator", path: "/tools/rug-size-calculator" },
        ]}
      />
      <h1 className="font-serif text-5xl">Rug size calculator</h1>
      <p className="mt-4 max-w-2xl">
        Measure the furniture, not the whole room. The rug should hold the front legs of the seating and still leave a border of bare floor at the walls. Sizes below are the stock sizes most rooms land on.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.href} className="border border-line bg-card p-5">
            <h2 className="font-serif text-h3">
              <Link href={guide.href} className="underline underline-offset-4">
                {guide.size}
              </Link>
            </h2>
            <p className="mt-2 text-sm">{guide.use}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/guides/measure-for-a-rug" className="underline underline-offset-4">
          How to measure a room in feet and inches
        </Link>
      </p>
    </Container>
  );
}
