"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-serif text-5xl">Something went wrong</h1>
      <p className="mt-4">The page did not finish loading. Try again, or return to the rug catalog.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="inline-flex min-h-12 items-center rounded-[2px] bg-inverse px-5 text-inverse-foreground" onClick={() => reset()}>
          Try again
        </button>
        <a href="/rugs" className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-5">
          Shop rugs
        </a>
      </div>
    </div>
  );
}
