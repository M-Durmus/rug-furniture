"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import type { Review } from "@/types";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function ReviewsSection({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}) {
  const [sort, setSort] = useState("newest");
  const [helpful, setHelpful] = useState<Record<string, boolean>>({});
  const sorted = useMemo(() => {
    const copy = [...reviews];
    copy.sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating || b.date.localeCompare(a.date);
      if (sort === "lowest") return a.rating - b.rating || b.date.localeCompare(a.date);
      return b.date.localeCompare(a.date);
    });
    return copy;
  }, [reviews, sort]);
  const counts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((review) => review.rating === star).length,
  );

  return (
    <section id="reviews" className="mt-14 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-h2">Reviews</h2>
          <p className="mt-2">
            {rating.toFixed(1)} out of 5 from {reviewCount}{" "}
            {reviewCount === 1 ? "review" : "reviews"}.
          </p>
        </div>
        <label className="text-sm">
          Sort
          <Select
            className="mt-1 min-w-40"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </Select>
        </label>
      </div>

      {reviews.length > 0 ? (
        <ol className="mt-6 max-w-md space-y-2" aria-label="Rating distribution">
          {counts.map((count, index) => {
            const star = 5 - index;
            const width = Math.round((count / reviews.length) * 100);
            return (
              <li key={star} className="flex items-center gap-3 text-sm">
                <span className="w-14">{star} star</span>
                <span className="h-2 flex-1 bg-sand">
                  <span className="block h-2 bg-ink" style={{ width: `${width}%` }} />
                </span>
                <span className="w-6 text-right">{count}</span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="mt-6">Written notes for this piece are not on the page yet.</p>
      )}

      <ul className="mt-8 space-y-6">
        {sorted.map((review) => (
          <li key={review.id} className="border-b border-line pb-6">
            <article>
              <h3 className="font-serif text-h3">{review.title}</h3>
              <p className="mt-1 text-sm text-mute">
                <span className="sr-only">Rated </span>
                {review.rating} out of 5<span aria-hidden="true"> · </span>
                {review.author}, {review.city}
                <span aria-hidden="true"> · </span>
                <time dateTime={review.date}>
                  {dateFormat.format(new Date(`${review.date}T00:00:00`))}
                </time>
              </p>
              <p className="mt-3 leading-6">{review.body}</p>
              <button
                type="button"
                className="mt-3 inline-flex min-h-10 items-center rounded-[2px] border border-line px-3 text-sm"
                aria-pressed={helpful[review.id] === true}
                onClick={() =>
                  setHelpful((current) => ({ ...current, [review.id]: !current[review.id] }))
                }
              >
                Helpful
              </button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
