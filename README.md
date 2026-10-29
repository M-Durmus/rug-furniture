# Wool & Loom

United States storefront for Turkish rugs and furniture, plus quote-priced rug care. The shop sells from Wool & Loom warehouses in New Jersey, Georgia, Texas, and California. Cleaning, repair, custom sizing, and pickup are quoted. Nothing on this site charges a card.

Language is English. Currency is USD. Sizes are in feet and inches.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test          # unit tests
npm run verify    # metadata, JSON-LD, sitemap, and robots checks
npm run lint
npm run test:e2e  # Playwright smoke tests; reuses a dev server on port 3000
```

Production:

```bash
npm run build
npm start
```

`NEXT_PUBLIC_SITE_URL` sets canonical URLs. It defaults to `https://www.woolandloom.com`.

## Folder structure

- `app/` — routes, metadata, sitemap, and server actions
- `components/` — UI, catalog, cart, checkout, and service forms
- `data/` — mock JSON for products, categories, services, areas, posts, and reviews
- `lib/data/` — the service layer pages call instead of reading JSON directly
- `lib/catalog/`, `lib/checkout/`, `lib/seo/`, `lib/cart/` — listing, coupons, metadata, and the cart store
- `public/images/` — logo and photographs
- `e2e/` — Playwright smoke tests

## Swap the mock data for an API

Pages import functions such as `getProducts`, `getProductBySlug`, and `getServices` from `lib/data/catalog.ts`. Those functions currently return the JSON in `data/`.

To use a real backend, keep the function names and the types in `types/index.ts`, and replace the bodies so they fetch from your API. Callers should not need to change. Prices still go through `priceForSize` in `lib/data/price.ts` unless the API returns a final unit price.

Do not import `data/*.json` from a page. Add the new read in `lib/data/` so the next backend swap stays in one place.

## Placeholders

These are intentional stand-ins. They are not live services.

- **Payment.** Checkout collects an address and shows a success page. No card is charged and Stripe is not connected.
- **Photographs.** Product and room photos are freely licensed stock photos stored in `public/images/photos/`. They illustrate the catalog. They are not photographs of the warehouse inventory. iStock files are paid and are not included.
- **Logo.** `public/images/logo.png` is the wordmark cut out of the supplied artwork, with a light version for the dark footer.
- **Room preview.** `/room-preview` accepts a waitlist email. The file picker is disabled. There is no AR try-on.
- **Swatches and rug pads.** The cart suggests them. They are not a separate priced SKU.
- **Account.** Sign-in is stored in this browser only. There is no password server.
- **Quote photos.** The quote form’s photo field is disabled. The note field carries the description.
- **Newsletter.** The footer form stores nothing on a server. It confirms in the browser.

## Catalog photos

Stock photos live in `public/images/photos/`. `data/products.json` points at them. Replace a file, or change the `images` array, and the product card, gallery, and cart thumbnail follow.
