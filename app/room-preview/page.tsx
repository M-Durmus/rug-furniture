import dynamic from "next/dynamic";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";

const RoomPreviewWaitlist = dynamic(() =>
  import("@/components/room/RoomPreviewWaitlist").then((mod) => mod.RoomPreviewWaitlist),
);
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Room preview",
  description:
    "Room preview will place a Wool & Loom rug in a photo of your floor. The upload is not open yet. Join the waitlist.",
  path: "/room-preview",
});

const steps = [
  {
    title: "Photograph the room",
    text: "Daylight, from a corner, with the floor you want covered in the frame. A phone photo is enough.",
  },
  {
    title: "Mark the floor",
    text: "We use the clear floor, not the whole wall-to-wall measurement, and keep a border of bare floor.",
  },
  {
    title: "See a rug in the photo",
    text: "The preview will drop a stock size into that photo. That step is not connected yet.",
  },
];

export default function RoomPreviewPage() {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Room preview", path: "/room-preview" },
        ]}
      />
      <h1 className="max-w-3xl text-h1">Room preview</h1>
      <p className="mt-4 max-w-2xl">
        This page will show a rug in your room. It is a placeholder until the photo step is built.
        Measure in feet in the meantime, and shop a stock size.
      </p>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border border-line bg-card p-5">
            <p className="text-sm text-mute">Step {index + 1}</p>
            <h2 className="mt-2 font-serif text-h3">{step.title}</h2>
            <p className="mt-2">{step.text}</p>
          </li>
        ))}
      </ol>
      <section className="mt-10 max-w-xl" aria-labelledby="upload-heading">
        <h2 id="upload-heading" className="font-serif text-h2">
          Photo
        </h2>
        <label className="mt-4 block text-sm" htmlFor="room-photo">
          Room photo, coming soon
          <input
            id="room-photo"
            type="file"
            disabled
            aria-disabled="true"
            className="mt-2 block w-full cursor-not-allowed border border-dashed border-line bg-sand p-6 text-mute"
          />
        </label>
        <p className="mt-2 text-sm text-mute">
          Coming soon. The upload does not accept a file yet.
        </p>
      </section>
      <section className="mt-10" aria-labelledby="waitlist-heading">
        <h2 id="waitlist-heading" className="font-serif text-h2">
          Waitlist
        </h2>
        <p className="mt-3 max-w-xl">Leave an email. We will write when a photo can take a rug.</p>
        <div className="mt-4">
          <RoomPreviewWaitlist />
        </div>
      </section>
    </Container>
  );
}
