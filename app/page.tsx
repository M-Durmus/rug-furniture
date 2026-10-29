import Image from "next/image";
import Link from "next/link";
import type { FurnitureKind } from "@/components/media/FurnitureArt";
import { Inspiration } from "@/components/home/Inspiration";
import { ProductCard } from "@/components/home/ProductCard";
import { RoomNotify } from "@/components/home/RoomNotify";
import { RoomScene } from "@/components/home/RoomScene";
import { ServiceFinder } from "@/components/home/ServiceFinder";
import { WarehouseMap } from "@/components/home/WarehouseMap";
import { TrustBar } from "@/components/layout/TrustBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tabs } from "@/components/ui/Tabs";
import {
  getBlogPosts,
  getProducts,
  getReviews,
  getServiceAreas,
  getServices,
  getUnitPrice,
  getWarehouses,
} from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Product, ProductSize } from "@/types";

export const metadata = buildMetadata({
  title: "Wool & Loom | Turkish Rugs and Furniture",
  description:
    "Handpicked Turkish rugs shipped from Wool & Loom warehouses in New Jersey, Georgia, Texas, and California. Rug cleaning, repair, and custom sizing are priced by quote.",
  path: "/",
  absolute: true,
});

const categories: {
  name: string;
  href: string;
  text: string;
  image: string;
  kind: "rug" | "furniture";
  furniture?: FurnitureKind;
  colors: string[];
  style: string;
}[] = [
  {
    name: "Oushak",
    href: "/rugs/oushak",
    text: "Ivory and apricot fields for a sofa and two chairs.",
    image: "/images/photos/rug-oushak.webp",
    kind: "rug",
    colors: ["#e7dccb", "#c4896a", "#6f675b"],
    style: "oushak",
  },
  {
    name: "Vintage",
    href: "/rugs/vintage",
    text: "Softened medallions, already in a U.S. warehouse.",
    image: "/images/photos/rug-field.webp",
    kind: "rug",
    colors: ["#c4a574", "#7a3b32", "#1d1a16"],
    style: "medallion",
  },
  {
    name: "Runner",
    href: "/rugs/runner",
    text: "Hall runners about 2 feet wide, measured in inches.",
    image: "/images/photos/rug-border.webp",
    kind: "rug",
    colors: ["#3e4c66", "#e7dccb", "#1d1a16"],
    style: "stripe",
  },
  {
    name: "Washable",
    href: "/rugs/washable",
    text: "Flatweaves that can take a wash after a busy week.",
    image: "/images/photos/rug-flat.webp",
    kind: "rug",
    colors: ["#d9d3c7", "#8a9178", "#2a2724"],
    style: "grid",
  },
  {
    name: "Sofas",
    href: "/furniture/sofas",
    text: "Linen and boucle sofas scaled to an 8 by 10 rug.",
    image: "/images/photos/sofa.webp",
    kind: "furniture",
    furniture: "sofa",
    colors: ["#f3efe6", "#c4a574"],
    style: "sofa",
  },
  {
    name: "Coffee Tables",
    href: "/furniture/coffee-tables",
    text: "Low tables that sit fully on the pile.",
    image: "/images/photos/table.webp",
    kind: "furniture",
    furniture: "table",
    colors: ["#e6dfd2", "#8a7355"],
    style: "table",
  },
];

const sizes = [
  { label: "2×3", href: "/rugs/size/2x3" },
  { label: "4×6", href: "/rugs/size/4x6" },
  { label: "5×8", href: "/rugs/size/5x8" },
  { label: "6×9", href: "/rugs/size/6x9" },
  { label: "8×10", href: "/rugs/size/8x10" },
  { label: "9×12", href: "/rugs/size/9x12" },
  { label: "10×14", href: "/rugs/size/10x14" },
  { label: "Custom size", href: "/rugs/size/custom" },
];

async function pricedSize(product: Product): Promise<ProductSize> {
  const target = product.salePrice ?? product.price;
  for (const size of product.sizes) {
    const unit = await getUnitPrice(product.id, size.label);
    if (unit === target) return size;
  }
  const fallback = product.sizes[0];
  if (!fallback) throw new Error(`${product.slug} has no sizes`);
  return fallback;
}

function ProductGrid({ items }: { items: { product: Product; size: ProductSize }[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ product, size }) => (
        <li key={product.id}>
          <ProductCard product={product} size={size} />
        </li>
      ))}
    </ul>
  );
}

export default async function HomePage() {
  const [all, rugs, furniture, services, areas, warehouses, reviews, posts] = await Promise.all([
    getProducts({}, "featured", { pageSize: 8 }),
    getProducts({ type: "rug" }, "featured", { pageSize: 8 }),
    getProducts({ type: "furniture" }, "featured", { pageSize: 8 }),
    getServices(),
    getServiceAreas(),
    getWarehouses(),
    getReviews(),
    getBlogPosts(),
  ]);

  const [allCards, rugCards, furnitureCards] = await Promise.all([
    Promise.all(all.items.map(async (product) => ({ product, size: await pricedSize(product) }))),
    Promise.all(rugs.items.map(async (product) => ({ product, size: await pricedSize(product) }))),
    Promise.all(
      furniture.items.map(async (product) => ({ product, size: await pricedSize(product) })),
    ),
  ]);

  const quotes = reviews.filter((review) => review.rating === 5).slice(0, 3);
  const journal = posts.slice(0, 3);

  return (
    <>
      <section aria-labelledby="hero-title">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <h1 id="hero-title" className="text-h1">
              Timeless Turkish Rugs. Expert Care, Always.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8">
              Handpicked in Turkey and shipped from our own warehouses in New Jersey, Georgia,
              Texas, and California. Cleaning, repair, and custom sizing stay with our service team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/rugs">Shop all rugs</Button>
              <Button href="/contact" variant="outline">
                Request a service quote
              </Button>
            </div>
          </div>
          <RoomScene />
        </Container>
      </section>

      <TrustBar />

      <section aria-labelledby="category-title" className="py-14">
        <Container>
          <h2 id="category-title" className="text-h2">
            Shop by category
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="flex h-full gap-4 border border-line bg-card p-4"
                >
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-sand">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <span>
                    <span className="block font-serif text-h3">{category.name}</span>
                    <span className="mt-2 block text-sm text-mute">{category.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="size-title" className="border-t border-line py-14">
        <Container>
          <h2 id="size-title" className="text-h2">
            Shop by size
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Sizes are in feet. Custom size is cut and bound to the measurement you send.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <li key={size.href}>
                <Link
                  href={size.href}
                  className="inline-flex min-h-10 items-center rounded-[2px] border border-line bg-card px-3 text-sm"
                >
                  {size.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="featured-title" className="border-t border-line py-14">
        <Container>
          <h2 id="featured-title" className="text-h2">
            Featured products
          </h2>
          <div className="mt-6">
            <Tabs
              label="Featured products"
              tabs={[
                { id: "all", label: "All", content: <ProductGrid items={allCards} /> },
                { id: "rugs", label: "Rugs", content: <ProductGrid items={rugCards} /> },
                {
                  id: "furniture",
                  label: "Furniture",
                  content: <ProductGrid items={furnitureCards} />,
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="care-title" className="border-t border-line py-14">
        <Container>
          <h2 id="care-title" className="text-h2">
            Rug care services
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <li key={service.id} className="border border-line bg-card p-5">
                <h3 className="font-serif text-h3">
                  <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm">{service.shortDescription}</p>
                <p className="mt-3 text-sm text-mute">Priced by quote</p>
              </li>
            ))}
          </ul>
          <ServiceFinder areas={areas} />
        </Container>
      </section>

      <section aria-labelledby="preview-title" className="border-t border-line py-14">
        <Container>
          <h2 id="preview-title" className="text-h2">
            Room preview
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            See a stock rug in a photo of your room. The tool is not open yet.
          </p>
          <div className="mt-6">
            <RoomNotify />
          </div>
        </Container>
      </section>

      <section aria-labelledby="warehouse-title" className="border-t border-line py-14">
        <Container>
          <h2 id="warehouse-title" className="text-h2">
            Warehouse inventory
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Every rug ships from the warehouse that holds it. Delivery days are from that dock.
          </p>
          <div className="mt-6">
            <WarehouseMap warehouses={warehouses} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="calculator-title" className="border-t border-line py-14">
        <Container className="grid gap-6 border border-line bg-card p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 id="calculator-title" className="text-h2">
              Rug size calculator
            </h2>
            <p className="mt-3 max-w-2xl">
              Measure the furniture footprint in feet and inches, then match it to a stock size that
              leaves a border of bare floor.
            </p>
          </div>
          <Button href="/tools/rug-size-calculator">Open the calculator</Button>
        </Container>
      </section>

      <section aria-labelledby="inspiration-title" className="border-t border-line py-14">
        <Container>
          <h2 id="inspiration-title" className="text-h2">
            Inspiration
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Rooms styled with stock rugs. Photographs will replace these studies.
          </p>
          <div className="mt-6">
            <Inspiration />
          </div>
        </Container>
      </section>

      <section aria-labelledby="trade-title" className="bg-dark py-14 text-[#f1ebe0]">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="trade-title" className="text-h2">
              Trade program
            </h2>
            <p className="mt-3 max-w-xl">
              Designers and retailers order from the same four warehouses. No separate trade stock,
              no extra freight desk.
            </p>
          </div>
          <Link
            href="/trade"
            className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-[#f1ebe0] px-4"
          >
            Apply now
          </Link>
        </Container>
      </section>

      <section aria-labelledby="reviews-title" className="py-14">
        <Container>
          <h2 id="reviews-title" className="text-h2">
            4.9 out of 5
          </h2>
          <p className="mt-3 text-mute">From customers in the cities we deliver to.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {quotes.map((review) => (
              <li key={review.id} className="border border-line bg-card p-5">
                <p className="text-sm text-mute">
                  {review.author} · {review.city}
                </p>
                <h3 className="mt-2 font-serif text-h3">{review.title}</h3>
                <p className="mt-2 text-sm">{review.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="journal-title" className="border-t border-line py-14">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 id="journal-title" className="text-h2">
              Journal
            </h2>
            <Link href="/blog" className="text-sm underline underline-offset-4">
              All articles
            </Link>
          </div>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {journal.map((post) => (
              <li key={post.id} className="border border-line bg-card p-5">
                <p className="text-sm text-mute">
                  {post.category} · {post.readMinutes} min
                </p>
                <h3 className="mt-2 font-serif text-h3">
                  <Link href={`/blog/${post.slug}`} className="underline underline-offset-4">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
