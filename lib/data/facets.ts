import type { Facet, Warehouse } from "@/lib/data/types";

export const warehouses: Warehouse[] = [
  {
    id: "nj",
    name: "New Jersey warehouse",
    street: "1400 Commerce Way",
    city: "Elizabeth",
    state: "New Jersey",
    region: "NJ",
    postalCode: "07201",
    phone: "+1-973-555-0148",
  },
  {
    id: "ga",
    name: "Georgia warehouse",
    street: "850 Industrial Boulevard",
    city: "Fairburn",
    state: "Georgia",
    region: "GA",
    postalCode: "30213",
    phone: "+1-770-555-0162",
  },
  {
    id: "tx",
    name: "Texas warehouse",
    street: "4200 Trade Center Drive",
    city: "Grand Prairie",
    state: "Texas",
    region: "TX",
    postalCode: "75052",
    phone: "+1-214-555-0194",
  },
  {
    id: "ca",
    name: "California warehouse",
    street: "910 Warehouse Road",
    city: "Ontario",
    state: "California",
    region: "CA",
    postalCode: "91761",
    phone: "+1-909-555-0133",
  },
];

export const sizes: Facet[] = [
  {
    slug: "2x3",
    name: "2 × 3",
    label: "2' × 3'",
    title: "2 × 3 Turkish Rugs",
    description:
      "Shop 2 by 3 foot Turkish rugs for entries and small landings, in stock at Wool & Loom U.S. warehouses.",
    intro:
      "A 2 by 3 foot rug fits a single door, a powder room, or the foot of a narrow bench. Measure the clear floor in feet and inches before you order so the rug does not block the swing of the door.",
  },
  {
    slug: "3x5",
    name: "3 × 5",
    label: "3' × 5'",
    title: "3 × 5 Turkish Rugs",
    description:
      "Shop 3 by 5 foot Turkish rugs for entryways and bedside floors, stocked in the United States by Wool & Loom.",
    intro:
      "A 3 by 5 foot rug sits beside a bed, inside a small entry, or in front of a single sink vanity. Leave at least 2 inches of floor before any door that swings over the rug.",
  },
  {
    slug: "4x6",
    name: "4 × 6",
    label: "4' × 6'",
    title: "4 × 6 Turkish Rugs",
    description:
      "Shop 4 by 6 foot Turkish rugs for bedrooms and small seating, in stock at Wool & Loom U.S. warehouses.",
    intro:
      "A 4 by 6 foot rug sits under the foot of a bed or in front of a loveseat. Leave a border of bare floor so the rug does not meet the baseboard.",
  },
  {
    slug: "5x7",
    name: "5 × 7",
    label: "5' × 7'",
    title: "5 × 7 Turkish Rugs",
    description:
      "Shop 5 by 7 foot Turkish rugs for bedrooms and compact seating areas, ready to ship from Wool & Loom.",
    intro:
      "A 5 by 7 foot rug anchors a queen bed with a border of bare floor, or a loveseat and one chair. Front legs of the seating should sit on the rug.",
  },
  {
    slug: "5x8",
    name: "5 × 8",
    label: "5' × 8'",
    title: "5 × 8 Turkish Rugs",
    description:
      "Shop 5 by 8 foot Turkish rugs for bedrooms and compact living rooms, stocked in the United States by Wool & Loom.",
    intro:
      "A 5 by 8 foot rug holds a sofa and a chair, or a queen bed with the rug starting just below the pillows. Measure the clear floor in feet and inches first.",
  },
  {
    slug: "6x9",
    name: "6 × 9",
    label: "6' × 9'",
    title: "6 × 9 Turkish Rugs",
    description:
      "Shop 6 by 9 foot Turkish rugs for living rooms and dining areas, in stock at four Wool & Loom warehouses.",
    intro:
      "A 6 by 9 foot rug holds a sofa and two chairs, or a table with four chairs when you add about 2 feet of rug beyond the table edge.",
  },
  {
    slug: "8x10",
    name: "8 × 10",
    label: "8' × 10'",
    title: "8 × 10 Turkish Rugs",
    description:
      "Shop 8 by 10 foot Turkish rugs for main living rooms, in stock and sized in feet and inches at Wool & Loom.",
    intro:
      "An 8 by 10 foot rug is the usual size for a standard sofa, two chairs, and a coffee table. All front legs should rest on the pile, with a visible floor border at the walls.",
  },
  {
    slug: "9x12",
    name: "9 × 12",
    label: "9' × 12'",
    title: "9 × 12 Turkish Rugs",
    description:
      "Shop 9 by 12 foot Turkish rugs for open seating and dining rooms, shipped from Wool & Loom U.S. stock.",
    intro:
      "A 9 by 12 foot rug covers an open living room or a table with six to eight chairs. Check the rolled length against your stair landing before delivery day.",
  },
  {
    slug: "10x14",
    name: "10 × 14",
    label: "10' × 14'",
    title: "10 × 14 Turkish Rugs",
    description:
      "Shop 10 by 14 foot Turkish rugs for large living rooms, in stock at Wool & Loom warehouses.",
    intro:
      "A 10 by 14 foot rug covers an open seating group and still leaves a floor border at the walls. Confirm the rolled length will turn on your stairs before delivery.",
  },
  {
    slug: "custom",
    name: "Custom size",
    label: "Custom size",
    title: "Custom Size Turkish Rugs",
    description:
      "Order a Wool & Loom rug cut and bound to the foot-and-inch size your room needs. The work is priced by quote.",
    intro:
      "When a stock size leaves too much floor or too little, we cut and bind a wool rug to your measurement. Use the rug size calculator to compare stock sizes, then request a quote for the custom cut.",
  },
  {
    slug: "2x8",
    name: "2'6\" × 8'",
    label: "2'6\" × 8'",
    title: "Turkish Runner Rugs",
    description:
      "Shop Turkish runner rugs about 2 feet 6 inches by 8 feet for halls and galleries, in stock at Wool & Loom.",
    intro:
      "A runner about 2 feet 6 inches wide leaves walking room in a 3 foot hall. Measure the hall in inches, then keep 3 inches of floor on each long side.",
  },
];

export const styles: Facet[] = [
  {
    slug: "persian",
    name: "Persian",
    label: "Persian",
    title: "Persian Turkish Rugs",
    description:
      "Shop Persian-style Turkish rugs with medallions and borders, in stock at Wool & Loom warehouses in the U.S.",
    intro:
      "These pieces follow the Persian drawing tradition as it is woven in Turkey: a central medallion, a layered border, and wool pile meant for everyday rooms.",
  },
  {
    slug: "oushak",
    name: "Oushak",
    label: "Oushak",
    title: "Oushak Rugs",
    description:
      "Shop Oushak rugs with open fields and soft wool, stocked in the United States by Wool & Loom.",
    intro:
      "Oushak rugs leave more of the field open, so they sit calmly under large furniture. The wool is pliable and the drawing is spaced rather than dense.",
  },
  {
    slug: "kilim",
    name: "Kilim",
    label: "Kilim",
    title: "Turkish Kilim Rugs",
    description:
      "Shop flatweave Turkish kilims for halls, dining rooms, and light traffic, in stock at Wool & Loom.",
    intro:
      "A kilim is a flatweave with no pile. It slides under dining chairs more easily than a thick knot and shows the geometry of the weave directly.",
  },
  {
    slug: "vintage",
    name: "Vintage",
    label: "Vintage",
    title: "Vintage Turkish Rugs",
    description:
      "Shop vintage Turkish rugs with softened wool and older drawing, ready to ship from Wool & Loom.",
    intro:
      "Vintage pieces have already lost their factory stiffness. Color is softer, edges may show honest wear, and each rug is one of a kind in our stock.",
  },
  {
    slug: "modern",
    name: "Modern",
    label: "Modern",
    title: "Modern Turkish Rugs",
    description:
      "Shop modern Turkish rugs with quieter geometry, in stock at Wool & Loom warehouses across the U.S.",
    intro:
      "Modern drawings use fewer colors and a clearer repeat. They work in rooms that already have patterned upholstery or a strong wood grain.",
  },
];

export const colors: Facet[] = [
  {
    slug: "ivory",
    name: "Ivory",
    label: "Ivory",
    title: "Ivory Turkish Rugs",
    description:
      "Shop ivory Turkish rugs that lighten living rooms and bedrooms, in stock at Wool & Loom.",
    intro:
      "Ivory fields reflect daylight and make a room read larger. They show daily traffic, so plan on rotation and a quote for cleaning once a year in a busy room.",
  },
  {
    slug: "blue",
    name: "Blue",
    label: "Blue",
    title: "Blue Turkish Rugs",
    description:
      "Shop blue Turkish rugs, from indigo fields to pale stripes, stocked in the United States by Wool & Loom.",
    intro:
      "Blue grounds a room that already has warm wood or terracotta upholstery. Indigo wool holds its color well in south-facing rooms.",
  },
  {
    slug: "terracotta",
    name: "Terracotta",
    label: "Terracotta",
    title: "Terracotta Turkish Rugs",
    description:
      "Shop terracotta Turkish rugs with brick and rust wool, in stock at Wool & Loom U.S. warehouses.",
    intro:
      "Terracotta sits between orange and brick. It warms white walls and pairs with oak, linen, and unlacquered brass.",
  },
  {
    slug: "sage",
    name: "Sage",
    label: "Sage",
    title: "Sage Turkish Rugs",
    description:
      "Shop sage Turkish rugs with muted green wool, ready to ship from Wool & Loom.",
    intro:
      "Sage is a grayed green that stays quiet next to stone, plaster, and blackened metal. It hides light dust better than ivory.",
  },
  {
    slug: "charcoal",
    name: "Charcoal",
    label: "Charcoal",
    title: "Charcoal Turkish Rugs",
    description:
      "Shop charcoal Turkish rugs for darker floors and modern rooms, in stock at Wool & Loom.",
    intro:
      "Charcoal pile defines the edge of a seating group on pale oak. Vacuum with the nap and rotate the rug each season so traffic stays even.",
  },
];

export function getSize(slug: string): Facet | undefined {
  return sizes.find((item) => item.slug === slug);
}

export function getStyle(slug: string): Facet | undefined {
  return styles.find((item) => item.slug === slug);
}

export function getColor(slug: string): Facet | undefined {
  return colors.find((item) => item.slug === slug);
}

export function getWarehouse(id: Warehouse["id"]): Warehouse {
  const warehouse = warehouses.find((item) => item.id === id);
  if (!warehouse) throw new Error(`Unknown warehouse ${id}`);
  return warehouse;
}
