import Link from "next/link";
import type { ReactNode } from "react";
import type { ListingModel } from "@/lib/catalog/listing";

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="font-medium text-ink">{legend}</legend>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

function OptionLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={
        active
          ? "flex min-h-10 items-center gap-2 rounded-[2px] bg-sand px-2 text-sm text-ink"
          : "flex min-h-10 items-center gap-2 rounded-[2px] px-2 text-sm text-mute hover:text-ink"
      }
    >
      {children}
    </Link>
  );
}

export function FilterPanel({ model, idPrefix }: { model: ListingModel; idPrefix: string }) {
  const list = "flex max-h-56 flex-col overflow-auto";

  return (
    <form className="flex flex-col gap-8" aria-label="Filters">
      {model.groups.sizes.length > 0 ? (
        <Group legend="Size">
          <ul className={list}>
            {model.groups.sizes.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  {item.label} <span className="ml-auto text-mute">({item.count})</span>
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
      {model.groups.colors.length > 0 ? (
        <Group legend="Color">
          <ul className="flex flex-col">
            {model.groups.colors.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0 border border-line"
                    style={{ backgroundColor: item.hex }}
                  />
                  {item.label}
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
      {model.groups.styles.length > 0 ? (
        <Group legend="Style">
          <ul className={list}>
            {model.groups.styles.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  {item.label}
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
      {model.groups.materials.length > 0 ? (
        <Group legend="Material">
          <ul className={list}>
            {model.groups.materials.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  {item.label}
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
      <Group legend="Price">
        <div className="flex flex-col gap-2">
          {model.price.hidden.map((field) => (
            <input key={field.name} type="hidden" name={field.name} value={field.value} />
          ))}
          <label className="text-sm text-mute" htmlFor={`${idPrefix}-min`}>
            Min
            <input
              id={`${idPrefix}-min`}
              name="min"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={model.price.min}
              className="mt-1 w-full border border-line bg-card px-3 py-2 text-ink"
            />
          </label>
          <label className="text-sm text-mute" htmlFor={`${idPrefix}-max`}>
            Max
            <input
              id={`${idPrefix}-max`}
              name="max"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={model.price.max}
              className="mt-1 w-full border border-line bg-card px-3 py-2 text-ink"
            />
          </label>
          <button
            type="submit"
            formAction={model.price.action}
            formMethod="get"
            className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink px-4 text-sm"
          >
            Apply price
          </button>
        </div>
      </Group>
      {model.groups.rooms.length > 0 ? (
        <Group legend="Room">
          <ul className="flex flex-col">
            {model.groups.rooms.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  {item.label}
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
      <Group legend="Availability">
        <ul className="flex flex-col">
          <li>
            <OptionLink href={model.washable.href} active={model.washable.active}>
              Washable only
            </OptionLink>
          </li>
          <li>
            <OptionLink href={model.stock.href} active={model.stock.active}>
              In stock only
            </OptionLink>
          </li>
        </ul>
      </Group>
      {model.groups.warehouses.length > 0 ? (
        <Group legend="Warehouse">
          <ul className="flex flex-col">
            {model.groups.warehouses.map((item) => (
              <li key={item.slug}>
                <OptionLink href={item.href} active={item.active}>
                  {item.label}
                </OptionLink>
              </li>
            ))}
          </ul>
        </Group>
      ) : null}
    </form>
  );
}
