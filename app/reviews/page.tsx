import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getReviews } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Reviews",
  description:
    "Notes from customers who bought a Wool & Loom rug or booked rug care. Authors are shown as initials.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />
      <h1 className="text-h1">Reviews</h1>
      <p className="mt-4 max-w-2xl">
        These are the notes we keep on file. Names are initials. Care work is still quoted, even
        when a review mentions a wash.
      </p>
      {reviews.length === 0 ? <p className="mt-8">No reviews yet.</p> : null}
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <li key={review.id} className="border border-line bg-card p-5">
            <p className="text-sm text-mute">
              {review.author} · {review.city} · {review.rating} of 5
            </p>
            <h2 className="mt-2 font-serif text-h3">{review.title}</h2>
            <p className="mt-2">{review.body}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
