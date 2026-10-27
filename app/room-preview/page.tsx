import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Room preview",
  description: "Plan a Wool & Loom rug and sofa together. Measure the floor in feet and inches, then shop a stock size.",
  path: "/room-preview",
});

export default function RoomPreviewPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Room preview", path: "/room-preview" }]} />
      <h1 className="font-serif text-5xl">Room preview</h1>
      <p className="mt-4 max-w-2xl">
        A seating group reads as one piece when the sofa, chairs, and coffee table share a rug. Measure that footprint in feet and inches, then choose a stock size that holds the front legs and leaves a border of floor.
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/rugs/size/8x10" className="underline underline-offset-4">
            8×10 rugs for a living room
          </Link>
        </li>
        <li>
          <Link href="/furniture" className="underline underline-offset-4">
            Furniture scaled for those rugs
          </Link>
        </li>
        <li>
          <Link href="/guides/measure-for-a-rug" className="underline underline-offset-4">
            How to measure
          </Link>
        </li>
      </ul>
    </Container>
  );
}
