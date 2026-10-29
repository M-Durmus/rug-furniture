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
  const [all, rugs, furniture, services, areas, warehouses, reviews, posts, stock] =
    await Promise.all([
      getProducts({}, "featured", { pageSize: 8 }),
      getProducts({ type: "rug" }, "featured", { pageSize: 8 }),
      getProducts({ type: "furniture" }, "featured", { pageSize: 8 }),
      getServices(),
      getServiceAreas(),
      getWarehouses(),
      getReviews(),
      getBlogPosts(),
      getProducts({}, "title", { pageSize: 80 }),
    ]);

  const markdowns = stock.items.filter((product) => product.salePrice !== undefined);
  const [allCards, rugCards, furnitureCards, saleCards] = await Promise.all([
    Promise.all(all.items.map(async (product) => ({ product, size: await pricedSize(product) }))),
    Promise.all(rugs.items.map(async (product) => ({ product, size: await pricedSize(product) }))),
    Promise.all(
      furniture.items.map(async (product) => ({ product, size: await pricedSize(product) })),
    ),
    Promise.all(
      markdowns.map(async (product) => ({ product, size: await pricedSize(product) })),
    ),
  ]);

  const quotes = reviews.filter((review) => review.rating === 5).slice(0, 3);
  const journal = posts.slice(0, 3);

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative min-h-[34rem] overflow-hidden bg-dark text-[#f6f1e8] sm:min-h-[40rem] lg:min-h-[46rem]"
      >
        <RoomScene />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#14110e]/85 via-[#14110e]/40 to-[#14110e]/25 lg:bg-gradient-to-r lg:from-[#14110e]/80 lg:via-[#14110e]/40 lg:to-transparent"
        />
        <Container className="relative flex min-h-[34rem] flex-col justify-end py-10 sm:min-h-[40rem] lg:min-h-[46rem] lg:justify-center lg:py-20">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#f1ebe0] uppercase">
            Handmade in Turkey
          </p>
          <h1 id="hero-title" className="mt-4 max-w-xl text-[#f6f1e8]">
            Timeless Turkish Rugs. Expert Care, Always.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#f1ebe0]">
            Handpicked in Turkey and shipped from our own warehouses in New Jersey, Georgia, Texas,
            and California. Cleaning, repair, and custom sizing stay with our service team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/rugs" variant="onDark">
              Shop all rugs
            </Button>
            <Button href="/contact" variant="onDarkOutline">
              Request a service quote
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#f1ebe0]">
            <li>Four U.S. warehouses</li>
            <li>Free shipping</li>
            <li>100-day returns</li>
          </ul>
        </Container>
      </section>

      <TrustBar />

      <section aria-labelledby="category-title" className="py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            The collection
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="category-title" className="text-h2">
              Shop by category
            </h2>
            <Link href="/rugs" className="text-sm underline underline-offset-4">
              Shop all rugs
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {categories.map((category, index) => (
              <li
                key={category.name}
                className={
                  index === 0
                    ? "sm:col-span-2 lg:col-span-3 lg:row-span-2"
                    : index < 3
                      ? "lg:col-span-3"
                      : index === categories.length - 1
                        ? "sm:col-span-2 lg:col-span-2"
                        : "lg:col-span-2"
                }
              >
                <Link
                  href={category.href}
                  className={`group relative block overflow-hidden bg-sand ${
                    index === 0
                      ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[32rem]"
                      : index < 3
                        ? "aspect-[4/5] lg:aspect-[5/4]"
                        : "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14110e]/80 via-[#14110e]/35 to-transparent p-5 text-[#f6f1e8]">
                    <span className="block font-serif text-2xl sm:text-3xl">{category.name}</span>
                    <span className="mt-1 block max-w-sm text-sm text-[#f1ebe0]">{category.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="size-title" className="bg-sand py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            Measured in feet
          </p>
          <h2 id="size-title" className="mt-3 text-h2">
            Shop by size
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Sizes are in feet. Custom size is cut and bound to the measurement you send.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {sizes.map((size) => (
              <li key={size.href}>
                <Link
                  href={size.href}
                  className="flex h-24 items-center justify-center border border-line bg-card px-2 text-center font-serif text-2xl transition-colors hover:border-ink hover:bg-bg"
                >
                  {size.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {saleCards.length > 0 ? (
        <section aria-labelledby="sale-title" className="border-t border-line bg-card py-16 lg:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                  Warehouse markdowns
                </p>
                <h2 id="sale-title" className="mt-3 text-h2">
                  Priced below the list
                </h2>
                <p className="mt-4 text-mute">
                  The accent price is what you pay. The crossed-out price is the regular list for
                  that size.
                </p>
                <p className="mt-4 text-sm">
                  {saleCards.length} {saleCards.length === 1 ? "piece" : "pieces"}, already in a
                  U.S. warehouse.
                </p>
              </div>
              <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {saleCards.map(({ product, size }) => (
                  <li key={product.id}>
                    <ProductCard product={product} size={size} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="featured-title" className="py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            In the warehouses
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="featured-title" className="text-h2">
              Featured products
            </h2>
            <Link href="/rugs" className="text-sm underline underline-offset-4">
              View the rugs
            </Link>
          </div>
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

      <section aria-labelledby="care-title" className="border-t border-line py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            After the sale
          </p>
          <h2 id="care-title" className="mt-3 text-h2">
            Rug care services
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Cleaning, repair, a cut that fits the floor, and the truck that brings it back.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col">
                  <span className="relative block aspect-[3/4] overflow-hidden bg-sand">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <span className="absolute top-3 left-3 bg-card px-2 py-1 font-serif text-lg leading-none text-accent">
                      0{index + 1}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col pt-4">
                    <h3 className="font-serif text-h3">{service.name}</h3>
                    <span className="mt-2 flex-1 text-sm text-mute">{service.shortDescription}</span>
                    <span className="mt-4 text-sm">Priced by quote</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid overflow-hidden border border-line bg-card lg:grid-cols-2">
            <div className="relative min-h-72">
              <Image
                src="/images/photos/rug-runner.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <ServiceFinder areas={areas} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="preview-title" className="border-t border-line py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            See it at home
          </p>
          <h2 id="preview-title" className="mt-3 text-h2">
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

      <section aria-labelledby="warehouse-title" className="border-t border-line bg-card py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            New Jersey, Georgia, Texas, California
          </p>
          <h2 id="warehouse-title" className="mt-3 text-h2">
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

      <section aria-labelledby="calculator-title" className="py-16 lg:py-20">
        <Container>
          <div className="grid overflow-hidden border border-line bg-card lg:grid-cols-2">
            <div className="relative min-h-72">
              <Image
                src="/images/photos/rug-field.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                Measure first
              </p>
              <h2 id="calculator-title" className="mt-3 text-h2">
                Rug size calculator
              </h2>
              <p className="mt-4 max-w-md">
                Measure the furniture footprint in feet and inches, then match it to a stock size
                that leaves a border of bare floor.
              </p>
              <div className="mt-8">
                <Button href="/tools/rug-size-calculator">Open the calculator</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="inspiration-title" className="border-t border-line py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            Rooms we return to
          </p>
          <h2 id="inspiration-title" className="mt-3 text-h2">
            Inspiration
          </h2>
          <p className="mt-3 max-w-2xl text-mute">
            Rooms photographed with pieces we stock. Open one to shop that size.
          </p>
          <div className="mt-6">
            <Inspiration />
          </div>
        </Container>
      </section>

      <section aria-labelledby="trade-title" className="bg-dark py-16 text-[#f1ebe0] lg:py-20">
        <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#d08b78] uppercase">
              For studios and retailers
            </p>
            <h2 id="trade-title" className="mt-3 text-h2">
              Trade program
            </h2>
            <p className="mt-4 max-w-xl text-[#f1ebe0]">
              Designers and retailers order from the same four warehouses. No separate trade stock,
              no extra freight desk.
            </p>
          </div>
          <Button href="/trade" variant="onDark">
            Apply now
          </Button>
        </Container>
      </section>

      <section aria-labelledby="reviews-title" className="py-16 lg:py-20">
        <Container>
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
            From the cities we deliver to
          </p>
          <h2 id="reviews-title" className="mt-3 text-h2">
            4.9 out of 5
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {quotes.map((review) => (
              <li key={review.id} className="flex h-full flex-col border border-line bg-card p-6">
                <p className="font-serif text-5xl leading-none text-accent" aria-hidden="true">
                  “
                </p>
                <h3 className="mt-3 font-serif text-h3">{review.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6">{review.body}</p>
                <p className="mt-6 text-sm text-mute">
                  {review.author} · {review.city}
                </p>
                <p className="sr-only">{review.rating} out of 5</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="journal-title" className="border-t border-line bg-sand py-16 lg:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                Notes from the studio
              </p>
              <h2 id="journal-title" className="mt-3 text-h2">
                Journal
              </h2>
            </div>
            <Link href="/blog" className="text-sm underline underline-offset-4">
              All articles
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {journal.map((post, index) => (
              <li
                key={post.id}
                className={`flex h-full flex-col border border-line p-6 ${index === 0 ? "bg-card md:min-h-80" : "bg-bg"}`}
              >
                <p className="text-[11px] font-medium tracking-[0.18em] text-mute uppercase">
                  {post.category}
                </p>
                <h3 className={`mt-4 font-serif ${index === 0 ? "text-3xl leading-tight" : "text-h3"}`}>
                  <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6">{post.excerpt}</p>
                <p className="mt-6 text-sm text-mute">{post.readMinutes} min read</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
