"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { useFavorites } from "@/components/favorites/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { signInSchema, type SignInInput } from "@/lib/checkout/schema";

const KEY = "wool-loom-account";
const EVENT = "wool-loom-account";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export type AccountMock = {
  orders: { id: string; placed: string; status: string; summary: string; total: number }[];
  quotes: { id: string; service: string; city: string; status: string }[];
  addresses: {
    id: string;
    label: string;
    line: string;
    city: string;
    state: string;
    zip: string;
  }[];
};

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function read() {
  return window.sessionStorage.getItem(KEY) ?? "";
}

export function AccountDesk({ mock }: { mock: AccountMock }) {
  const email = useSyncExternalStore(subscribe, read, () => "");
  const favorites = useFavorites();
  const [addresses, setAddresses] = useState(mock.addresses);

  if (!email) return <SignIn />;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>
          Signed in as <span className="font-medium">{email}</span>
        </p>
        <Button
          variant="outline"
          onClick={() => {
            window.sessionStorage.removeItem(KEY);
            window.dispatchEvent(new Event(EVENT));
          }}
        >
          Sign out
        </Button>
      </div>
      <div className="mt-6">
        <Tabs
          label="Account"
          tabs={[
            {
              id: "orders",
              label: "Orders",
              content:
                mock.orders.length === 0 ? (
                  <Empty
                    title="No orders yet"
                    text="Rugs and furniture you buy will be listed here."
                    href="/rugs"
                    action="Shop rugs"
                  />
                ) : (
                  <ul className="space-y-3">
                    {mock.orders.map((order) => (
                      <li key={order.id} className="border border-line bg-card p-4">
                        <p className="font-medium">{order.id}</p>
                        <p className="mt-1 text-sm text-mute">
                          {order.placed} · {order.status}
                        </p>
                        <p className="mt-2">{order.summary}</p>
                        <p className="mt-2">{usd.format(order.total)}</p>
                      </li>
                    ))}
                  </ul>
                ),
            },
            {
              id: "favorites",
              label: "Favorites",
              content:
                favorites.items.length === 0 ? (
                  <Empty
                    title="No favorites yet"
                    text="The heart on a product card saves it in this browser."
                    href="/rugs"
                    action="Browse rugs"
                  />
                ) : (
                  <ul className="space-y-3">
                    {favorites.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-3 border border-line bg-card p-4"
                      >
                        <Link href={item.href} className="underline underline-offset-4">
                          {item.title}
                        </Link>
                        <FavoriteButton item={item} />
                      </li>
                    ))}
                  </ul>
                ),
            },
            {
              id: "quotes",
              label: "Quote requests",
              content:
                mock.quotes.length === 0 ? (
                  <Empty
                    title="No quote requests"
                    text="Cleaning, repair, and sizing are quoted after the size and the city."
                    href="/book-service"
                    action="Request a quote"
                  />
                ) : (
                  <ul className="space-y-3">
                    {mock.quotes.map((quote) => (
                      <li key={quote.id} className="border border-line bg-card p-4">
                        <p className="font-medium">
                          {quote.id} · {quote.service}
                        </p>
                        <p className="mt-1 text-sm text-mute">{quote.city}</p>
                        <p className="mt-2">{quote.status}</p>
                      </li>
                    ))}
                  </ul>
                ),
            },
            {
              id: "addresses",
              label: "Addresses",
              content:
                addresses.length === 0 ? (
                  <Empty
                    title="No saved addresses"
                    text="The next checkout can start from a blank address."
                    href="/checkout"
                    action="Go to checkout"
                  />
                ) : (
                  <ul className="space-y-3">
                    {addresses.map((address) => (
                      <li key={address.id} className="border border-line bg-card p-4">
                        <p className="font-medium">{address.label}</p>
                        <p className="mt-2">
                          {address.line}
                          <br />
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <button
                          type="button"
                          className="mt-3 text-sm underline underline-offset-4"
                          onClick={() =>
                            setAddresses((current) =>
                              current.filter((item) => item.id !== address.id),
                            )
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ),
            },
            {
              id: "profile",
              label: "Profile",
              content: (
                <div className="border border-line bg-card p-4">
                  <p className="text-sm text-mute">Email</p>
                  <p className="mt-1">{email}</p>
                  <p className="mt-4 text-sm text-mute">
                    This sign-in lives in this browser. It does not create an account on a server.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function SignIn() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const busy = form.formState.isSubmitting;

  return (
    <form
      className="mt-8 max-w-md space-y-3"
      noValidate
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        const formEl = event.currentTarget;
        if (formEl.dataset.placing === "1") {
          event.preventDefault();
          return;
        }
        formEl.dataset.placing = "1";
        void form.handleSubmit(
          (values) => {
            window.sessionStorage.setItem(KEY, values.email);
            window.dispatchEvent(new Event(EVENT));
          },
          () => {
            formEl.dataset.placing = "";
          },
        )(event);
      }}
    >
      <p>Sign in to see sample orders, quotes, and addresses. Nothing is sent to a server.</p>
      <label className="block text-sm" htmlFor="account-email">
        Email
        <Input
          id="account-email"
          type="email"
          autoComplete="email"
          className="mt-1"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? "account-email-error" : undefined}
          {...form.register("email")}
        />
      </label>
      {form.formState.errors.email ? (
        <p id="account-email-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.email.message}
        </p>
      ) : null}
      <label className="block text-sm" htmlFor="account-password">
        Password
        <Input
          id="account-password"
          type="password"
          autoComplete="current-password"
          className="mt-1"
          aria-invalid={!!form.formState.errors.password}
          aria-describedby={form.formState.errors.password ? "account-password-error" : undefined}
          {...form.register("password")}
        />
      </label>
      {form.formState.errors.password ? (
        <p id="account-password-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.password.message}
        </p>
      ) : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}

function Empty({
  title,
  text,
  href,
  action,
}: {
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <div className="border border-line bg-card p-5">
      <h2 className="font-serif text-h3">{title}</h2>
      <p className="mt-2">{text}</p>
      <Button href={href} className="mt-4">
        {action}
      </Button>
    </div>
  );
}
