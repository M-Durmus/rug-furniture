"use client";

import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Drawer } from "@/components/ui/Drawer";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { ToastProvider, useToast } from "@/components/ui/Toast";

const lightTokens = [
  ["bg", "#fafaf8"],
  ["ink", "#171614"],
  ["mute", "#6d6963"],
  ["card", "#ffffff"],
  ["line", "#e5e2dc"],
  ["sand", "#f3f1ed"],
  ["dark", "#1b1814"],
  ["on-dark", "#f1ebe0"],
  ["accent", "#7a2f24"],
  ["success", "#3d7a4f"],
] as const;

const darkTokens = [
  ["bg", "#14110e"],
  ["ink", "#f1ebe0"],
  ["mute", "#a79d8c"],
  ["card", "#1d1915"],
  ["line", "#352f27"],
  ["sand", "#221d18"],
  ["dark", "#0b0a08"],
  ["on-dark", "#f1ebe0"],
  ["accent", "#d08b78"],
  ["success", "#8fbf9a"],
] as const;

function Kit({ id }: { id: string }) {
  const [fibers, setFibers] = useState<string[]>(["Wool"]);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const notify = useToast();

  function toggleFiber(name: string, pressed: boolean) {
    setFibers((current) => (pressed ? [...current, name] : current.filter((item) => item !== name)));
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby={`${id}-type`}>
        <h3 id={`${id}-type`}>Type</h3>
        <p className="mt-3 font-serif text-h1">Turkish rugs</p>
        <p className="mt-2 font-serif text-h2">In stock in four states</p>
        <p className="mt-2 font-serif text-h3">Rug care by quote</p>
        <p className="mt-2 max-w-prose">
          Body copy is 15px Inter. Headings use Cormorant Garamond at a line height of 1.1.
        </p>
      </section>

      <section aria-labelledby={`${id}-logo`}>
        <h3 id={`${id}-logo`}>Logo</h3>
        <div className="mt-3 flex flex-wrap items-end gap-6">
          <Logo />
          <Logo variant="mark" />
          <div className="bg-dark p-3">
            <Logo variant="light-on-dark" />
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-actions`}>
        <h3 id={`${id}-actions`}>Buttons, chips, and badges</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button>Shop rugs</Button>
          <Button variant="outline">Request a quote</Button>
          <Button variant="link" href="/services">
            Rug care
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Wool", "Silk", "Vintage"].map((fiber) => (
            <Chip
              key={fiber}
              pressed={fibers.includes(fiber)}
              onPressedChange={(pressed) => toggleFiber(fiber, pressed)}
            >
              {fiber}
            </Chip>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>In stock</Badge>
          <Badge tone="accent">New Jersey</Badge>
          <Badge tone="success">Ready to ship</Badge>
        </div>
      </section>

      <section aria-labelledby={`${id}-fields`}>
        <h3 id={`${id}-fields`}>Fields</h3>
        <Card className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            <Label htmlFor={`${id}-name`}>Name</Label>
            <Input id={`${id}-name`} name="name" autoComplete="name" placeholder="Ada Yilmaz" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor={`${id}-warehouse`}>Ships from</Label>
            <Select id={`${id}-warehouse`} name="warehouse" defaultValue="nj">
              <option value="nj">New Jersey</option>
              <option value="ga">Georgia</option>
              <option value="tx">Texas</option>
              <option value="ca">California</option>
            </Select>
          </div>
        </Card>
      </section>

      <section aria-labelledby={`${id}-disclosure`}>
        <h3 id={`${id}-disclosure`}>Accordion and tabs</h3>
        <Accordion
          items={[
            {
              title: "Cleaning",
              content: "We quote washing after we know the fiber, the dye, and the size in feet and inches.",
            },
            {
              title: "Repair",
              content: "Fringe, edge binding, and reweaving are priced from photos and a short description.",
            },
          ]}
        />
        <div className="mt-4">
          <Tabs
            label="Catalog"
            tabs={[
              { id: "rugs", label: "Rugs", content: "Hand-knotted and flatweave rugs from our U.S. warehouses." },
              { id: "furniture", label: "Furniture", content: "Tables, seating, and storage chosen to sit with the rugs." },
              { id: "care", label: "Care", content: "Cleaning, repair, custom sizing, pickup, and delivery by quote." },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby={`${id}-nav`}>
        <h3 id={`${id}-nav`}>Breadcrumbs</h3>
        <div className="mt-3">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Design system", path: "/design" },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby={`${id}-loading`}>
        <h3 id={`${id}-loading`}>Skeleton</h3>
        <div className="mt-3 grid max-w-sm gap-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </section>

      <section aria-labelledby={`${id}-overlays`}>
        <h3 id={`${id}-overlays`}>Modal, drawer, and toast</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setModal(true)}>
            Open modal
          </Button>
          <Button variant="outline" onClick={() => setDrawer(true)}>
            Open drawer
          </Button>
          <Button variant="outline" onClick={() => notify("Quote request saved on this device.")}>
            Show toast
          </Button>
        </div>
        {modal ? (
          <Modal title="Request a quote" onClose={() => setModal(false)}>
            <p>Tell us the size in feet and inches. We reply by email. This form does not take payment.</p>
          </Modal>
        ) : null}
        {drawer ? (
          <Drawer title="Filter rugs" onClose={() => setDrawer(false)}>
            <p>Origin, size, and fiber filters will live here. Nothing is applied from this review drawer.</p>
          </Drawer>
        ) : null}
      </section>
    </div>
  );
}

function TokenGrid({ tokens }: { tokens: readonly (readonly [string, string])[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {tokens.map(([name, hex]) => (
        <li key={name}>
          <div className="h-14 rounded-[2px] border border-line" style={{ background: hex }} />
          <p className="mt-1 text-sm font-medium">{name}</p>
          <p className="text-xs uppercase tracking-wide text-mute">{hex}</p>
        </li>
      ))}
    </ul>
  );
}

function ThemeColumn({ theme, tokens }: { theme: "light" | "dark"; tokens: readonly (readonly [string, string])[] }) {
  return (
    <section data-theme={theme} className="border border-line bg-bg p-4 text-ink sm:p-6" aria-label={`${theme} theme`}>
      <h2 className="capitalize">{theme}</h2>
      <div className="mt-4">
        <TokenGrid tokens={tokens} />
      </div>
      <div className="mt-8">
        <ToastProvider>
          <Kit id={theme} />
        </ToastProvider>
      </div>
    </section>
  );
}

export function DesignShowcase() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-10">
      <p className="text-sm uppercase tracking-[0.22em] text-mute">Wool & Loom</p>
      <h1 className="mt-2">Design system</h1>
      <p className="mt-4 max-w-2xl text-mute">
        Tokens, type, and components in light and dark. This page is not indexed. Use the theme control in the
        header to override the system preference for the rest of the site.
      </p>
      <div className="mt-8 grid gap-4">
        <div className="grid gap-2 text-sm text-mute sm:grid-cols-3">
          <p>Container 1180px, 20px side padding</p>
          <p>Spacing on an 8px grid</p>
          <p>2px corners, no heavy shadow</p>
        </div>
        <div className="flex items-end gap-2" aria-hidden="true">
          {[8, 16, 24, 32, 40].map((size) => (
            <div key={size} className="bg-ink" style={{ width: size, height: size }} />
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <ThemeColumn theme="light" tokens={lightTokens} />
        <ThemeColumn theme="dark" tokens={darkTokens} />
      </div>
    </div>
  );
}
