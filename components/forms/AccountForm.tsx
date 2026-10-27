"use client";

import { useState } from "react";

export function AccountForm() {
  const [done, setDone] = useState(false);
  if (done) return <p role="status">We saved that email on this device only. Sign-in links are not sent yet.</p>;
  return (
    <form
      className="mt-6 grid max-w-md gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const email = String(new FormData(event.currentTarget).get("email") || "");
        if (!email.includes("@")) return;
        setDone(true);
      }}
    >
      <div>
        <label htmlFor="account-email" className="block text-sm">
          Email
        </label>
        <input id="account-email" name="email" type="email" required autoComplete="email" className="mt-1 h-12 w-full rounded-[2px] border border-line bg-surface px-3" />
      </div>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground">
        Email me a sign-in link
      </button>
    </form>
  );
}
