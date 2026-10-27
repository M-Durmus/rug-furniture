import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { BlogPost, Category, Review, Service, ServiceArea, WarehouseName } from "../types";
import type { ProductSeed } from "../lib/data/seed";

const root = path.join(import.meta.dirname, "..", "data");

const delivery: Record<WarehouseName, string> = {
  "New Jersey": "1-3",
  Georgia: "2-4",
  Texas: "2-5",
  California: "3-5",
};

type RugRow = {
  slug: string;
  title: string;
  category: "oushak" | "vintage" | "runner" | "washable" | "turkish" | "persian-style";
  style: string;
  price: number;
  warehouse: WarehouseName;
  note: string;
  saleOff?: number;
};

const rugs: RugRow[] = [
  [
    "pale-oushak-field",
    "Pale Oushak Field",
    "oushak",
    "Open medallion",
    2480,
    "New Jersey",
    "The ivory field is large enough that a linen sofa can sit anywhere on it.",
  ],
  [
    "salon-oushak",
    "Salon Oushak",
    "oushak",
    "Floral medallion",
    3120,
    "Georgia",
    "A soft apricot medallion keeps a formal room from looking stiff.",
  ],
  [
    "apricot-oushak",
    "Apricot Oushak",
    "oushak",
    "All-over floral",
    2760,
    "Texas",
    "The apricot ground warms oak floors without turning the room orange.",
  ],
  [
    "ivory-oushak-medallion",
    "Ivory Oushak Medallion",
    "oushak",
    "Central medallion",
    3340,
    "California",
    "The medallion is centered for a sofa that faces the long side of the room.",
  ],
  [
    "faded-rose-oushak",
    "Faded Rose Oushak",
    "oushak",
    "Faded floral",
    2890,
    "New Jersey",
    "Rose shows up as a blush, not a print, so it works with mixed wood tones.",
  ],
  [
    "sand-oushak-border",
    "Sand Oushak Border",
    "oushak",
    "Bordered field",
    2210,
    "Georgia",
    "The sand border frames a dining table without a busy center.",
  ],
  [
    "blue-corner-oushak",
    "Blue Corner Oushak",
    "oushak",
    "Corner motifs",
    3580,
    "Texas",
    "Indigo corners hold a pale room together when the furniture is simple.",
  ],
  [
    "honey-oushak",
    "Honey Oushak",
    "oushak",
    "Warm field",
    2640,
    "California",
    "Honey and cream read as one tone from across a living room.",
  ],
  [
    "bergama-vintage",
    "Bergama Vintage",
    "vintage",
    "Worn geometric",
    4120,
    "New Jersey",
    "The rust and indigo have already softened, which is the point of a vintage piece.",
  ],
  [
    "usak-worn-medallion",
    "Usak Worn Medallion",
    "vintage",
    "Worn medallion",
    4680,
    "Georgia",
    "The center medallion is low-contrast, so it does not compete with a dark sofa.",
  ],
  [
    "muted-heriz-vintage",
    "Muted Heriz Vintage",
    "vintage",
    "Heriz geometric",
    3920,
    "Texas",
    "The corners are angular and the palette has been sun-faded to brick and sand.",
  ],
  [
    "clay-vintage-field",
    "Clay Vintage Field",
    "vintage",
    "Open field",
    3560,
    "California",
    "Clay and ivory do the work. There is no loud border to line up with the walls.",
  ],
  [
    "smoke-vintage",
    "Smoke Vintage",
    "vintage",
    "Abrashed field",
    4290,
    "New Jersey",
    "The pile shifts from charcoal to greige, which hides everyday traffic.",
  ],
  [
    "terracotta-vintage",
    "Terracotta Vintage",
    "vintage",
    "Tribal field",
    3840,
    "Georgia",
    "Terracotta stays earthy rather than bright, even in a south-facing room.",
  ],
  [
    "pearl-vintage",
    "Pearl Vintage",
    "vintage",
    "Pale vintage",
    4450,
    "Texas",
    "Pearl and taupe let a marble or oak coffee table stay visible.",
  ],
  [
    "olive-vintage",
    "Olive Vintage",
    "vintage",
    "Muted geometric",
    3710,
    "California",
    "Olive and brown sit quietly under a walnut table.",
  ],
  [
    "kars-hallway-runner",
    "Kars Hallway Runner",
    "runner",
    "Narrow geometric",
    780,
    "New Jersey",
    "Cut for a hall. Keep at least two inches of floor on each long side.",
  ],
  [
    "anatolian-stripe-runner",
    "Anatolian Stripe Runner",
    "runner",
    "Stripe",
    860,
    "Georgia",
    "The stripes run the length of the hall so the corridor feels longer, not busier.",
  ],
  [
    "narrow-kilim-runner",
    "Narrow Kilim Runner",
    "runner",
    "Flatweave kilim",
    640,
    "Texas",
    "A flatweave runner is the practical choice where a door swings across the end.",
  ],
  [
    "border-runner",
    "Border Runner",
    "runner",
    "Bordered runner",
    920,
    "California",
    "The border gives a plain hallway a finished edge without a center motif to center.",
  ],
  [
    "faded-hall-runner",
    "Faded Hall Runner",
    "runner",
    "Faded runner",
    740,
    "New Jersey",
    "The fade hides the scuff line that appears along a busy hall.",
  ],
  [
    "navy-runner",
    "Navy Runner",
    "runner",
    "Navy field",
    810,
    "Georgia",
    "Navy grounds a light stair hall and does not show every footprint.",
  ],
  [
    "cloud-washable",
    "Cloud Washable",
    "washable",
    "Soft solid",
    690,
    "New Jersey",
    "The pile is low and the backing is made to go in a home washer on cold.",
  ],
  [
    "stone-stripe-washable",
    "Stone Stripe Washable",
    "washable",
    "Stripe",
    740,
    "Georgia",
    "Stone stripes hide crumbs under a dining table between washes.",
  ],
  [
    "nursery-washable",
    "Nursery Washable",
    "washable",
    "Small-scale check",
    620,
    "Texas",
    "Sized for a nursery or a play corner, and made to be washed when it needs it.",
  ],
  [
    "checked-washable",
    "Checked Washable",
    "washable",
    "Check",
    710,
    "California",
    "The check is quiet enough for a kitchen sitting area.",
  ],
  [
    "soft-grid-washable",
    "Soft Grid Washable",
    "washable",
    "Grid",
    680,
    "New Jersey",
    "A grid reads as texture from the doorway and as a pattern up close.",
  ],
  [
    "clay-washable",
    "Clay Washable",
    "washable",
    "Tonal field",
    760,
    "Georgia",
    "Clay is practical in a family room where shoes come off at the door.",
  ],
  [
    "sivas-medallion",
    "Sivas Medallion",
    "turkish",
    "Medallion",
    2980,
    "New Jersey",
    "A classic Sivas medallion, with the border kept narrow so the field stays open.",
  ],
  [
    "hereke-border",
    "Hereke Border",
    "turkish",
    "Fine border",
    3640,
    "Georgia",
    "The border is detailed and the field is calm, which is how a Hereke-style rug earns a formal room.",
  ],
  [
    "konya-kilim",
    "Konya Kilim",
    "turkish",
    "Kilim",
    2140,
    "Texas",
    "Flatwoven wool from the Konya tradition. It lies flat where a thick pile would fight a door.",
  ],
  [
    "milas-geometric",
    "Milas Geometric",
    "turkish",
    "Geometric",
    2460,
    "California",
    "Milas geometry is bold in the sample book and measured once it is on the floor.",
  ],
  [
    "dosemealti-field",
    "Dosemealti Field",
    "turkish",
    "Open field",
    2720,
    "New Jersey",
    "The field is the point. Use it when the furniture already has pattern.",
  ],
  [
    "yahyali-medallion",
    "Yahyali Medallion",
    "turkish",
    "Medallion",
    3180,
    "Georgia",
    "A Yahyali medallion with a brick-red ground that still feels lived-in.",
  ],
  [
    "library-medallion",
    "Library Medallion",
    "persian-style",
    "Persian-style medallion",
    3520,
    "Texas",
    "Persian-style drawing, woven in Turkey, with a medallion scaled for a library or study.",
  ],
  [
    "garden-persian-style",
    "Garden Persian-Style",
    "persian-style",
    "Garden",
    3890,
    "California",
    "A garden layout in wool, not a print, with ivory paths between the motifs.",
  ],
  [
    "indigo-persian-style",
    "Indigo Persian-Style",
    "persian-style",
    "Indigo medallion",
    3360,
    "New Jersey",
    "Indigo is the ground. The medallion is ivory, so it stays readable at night.",
  ],
  [
    "cream-heriz-style",
    "Cream Heriz-Style",
    "persian-style",
    "Heriz-style",
    3010,
    "Georgia",
    "Heriz-style corners on a cream field. The geometry is structural, not fussy.",
  ],
  [
    "ruby-medallion",
    "Ruby Medallion",
    "persian-style",
    "Medallion",
    4280,
    "Texas",
    "Ruby is deep rather than scarlet, which is why it sits with walnut and blackened steel.",
  ],
  [
    "sage-persian-style",
    "Sage Persian-Style",
    "persian-style",
    "All-over",
    2940,
    "California",
    "Sage and ivory all-over pattern for a bedroom that does not want a single medallion.",
  ],
].map(([slug, title, category, style, price, warehouse, note]) => ({
  slug,
  title,
  category,
  style,
  price,
  warehouse,
  note,
})) as RugRow[];

rugs[3]!.saleOff = 0.12;
rugs[10]!.saleOff = 0.1;
rugs[22]!.saleOff = 0.15;
rugs[34]!.saleOff = 0.08;

const palettes: Record<RugRow["category"], { name: string; hex: string }[]> = {
  oushak: [
    { name: "Ivory", hex: "#e7dccb" },
    { name: "Apricot", hex: "#c4896a" },
    { name: "Sage", hex: "#8a9178" },
  ],
  vintage: [
    { name: "Clay", hex: "#a15b45" },
    { name: "Indigo", hex: "#3e4c66" },
    { name: "Sand", hex: "#cbbba4" },
  ],
  runner: [
    { name: "Navy", hex: "#243044" },
    { name: "Ivory", hex: "#efe6d6" },
    { name: "Brick", hex: "#8d4b3a" },
  ],
  washable: [
    { name: "Stone", hex: "#d7d1c7" },
    { name: "Clay", hex: "#c4a08a" },
    { name: "Cloud", hex: "#f3efe8" },
  ],
  turkish: [
    { name: "Brick", hex: "#8e3d32" },
    { name: "Ivory", hex: "#f0e6d4" },
    { name: "Navy", hex: "#1e2a44" },
  ],
  "persian-style": [
    { name: "Indigo", hex: "#2c3e5a" },
    { name: "Ivory", hex: "#f4ecdf" },
    { name: "Ruby", hex: "#7a2f38" },
  ],
};

const areaSizeSets = [
  [
    { label: "5x7", widthFt: 5, lengthFt: 7 },
    { label: "8x10", widthFt: 8, lengthFt: 10 },
    { label: "9x12", widthFt: 9, lengthFt: 12 },
  ],
  [
    { label: "6x9", widthFt: 6, lengthFt: 9 },
    { label: "8x10", widthFt: 8, lengthFt: 10 },
    { label: "10x14", widthFt: 10, lengthFt: 14 },
  ],
  [
    { label: "4x6", widthFt: 4, lengthFt: 6 },
    { label: "8x10", widthFt: 8, lengthFt: 10 },
    { label: "9x12", widthFt: 9, lengthFt: 12 },
  ],
  [
    { label: "3x5", widthFt: 3, lengthFt: 5 },
    { label: "5x7", widthFt: 5, lengthFt: 7 },
    { label: "8x10", widthFt: 8, lengthFt: 10 },
  ],
];

function rugSizes(
  category: RugRow["category"],
  index: number,
): { label: string; widthFt: number; lengthFt: number }[] {
  if (category === "runner") {
    return [
      { label: "2x8", widthFt: 2, lengthFt: 8 },
      { label: "2x10", widthFt: 2, lengthFt: 10 },
      { label: "3x12", widthFt: 3, lengthFt: 12 },
    ];
  }
  if (category === "washable") {
    return [
      { label: "2x3", widthFt: 2, lengthFt: 3 },
      { label: "5x7", widthFt: 5, lengthFt: 7 },
      { label: "8x10", widthFt: 8, lengthFt: 10 },
    ];
  }
  return areaSizeSets[index % areaSizeSets.length]!;
}

const roomsFor: Record<RugRow["category"], string[]> = {
  oushak: ["Living Room", "Bedroom"],
  vintage: ["Living Room", "Dining Room"],
  runner: ["Hallway", "Entry"],
  washable: ["Bedroom", "Dining Room"],
  turkish: ["Living Room", "Office"],
  "persian-style": ["Living Room", "Office"],
};

const rugMaterial: Record<
  RugRow["category"],
  { material: string; pile: string; washable: boolean }
> = {
  oushak: { material: "Hand-knotted wool", pile: "Medium", washable: false },
  vintage: { material: "Hand-knotted wool", pile: "Low", washable: false },
  runner: { material: "Flatweave wool", pile: "Flatweave", washable: false },
  washable: { material: "Washable recycled polyester", pile: "Low", washable: true },
  turkish: { material: "Hand-knotted wool", pile: "Medium", washable: false },
  "persian-style": { material: "Hand-knotted wool", pile: "Medium", washable: false },
};

const products: ProductSeed[] = rugs.map((rug, index) => {
  const spec = rugMaterial[rug.category];
  const sizes = rugSizes(rug.category, index);
  const primary =
    sizes.find((size) => size.label === "8x10") ??
    sizes.find((size) => size.label === "2x10") ??
    sizes[0]!;
  return {
    id: `rug-${String(index + 1).padStart(3, "0")}`,
    slug: rug.slug,
    title: rug.title,
    type: "rug",
    category: rug.category,
    brand: "Wool & Loom",
    description: `${rug.title} is a ${spec.pile.toLowerCase()} pile ${spec.material.toLowerCase()} rug from Turkey. ${rug.note} The listed price is for the ${primary.label.replace("x", " by ")} foot size. Larger sizes are priced by area, so an 8 by 10 costs more than a 5 by 7 of the same design. Measure the clear floor in feet and inches, and leave a border of bare floor at the walls.`,
    basePrice: rug.price,
    referenceWidthFt: primary.widthFt,
    referenceLengthFt: primary.lengthFt,
    saleOff: rug.saleOff,
    images: [],
    colors: palettes[rug.category],
    sizes,
    material: spec.material,
    origin: "Turkey",
    pile: spec.pile,
    style: rug.style,
    room: roomsFor[rug.category],
    washable: spec.washable,
    warehouse: rug.warehouse,
    stock: spec.washable ? 8 + (index % 5) : 1 + (index % 4),
    deliveryDays: delivery[rug.warehouse],
    rating: Number((4.4 + (index % 6) * 0.1).toFixed(1)),
    reviewCount: 6 + (index % 18),
    tags: [rug.category, rug.style.toLowerCase(), spec.washable ? "washable" : "wool"],
    seoTitle: `${rug.title} Turkish Rug`,
    seoDescription: `${rug.title} in wool, stocked at the Wool & Loom ${rug.warehouse} warehouse. Sizes in feet, priced by area.`,
  };
});

type FurnitureRow = {
  slug: string;
  title: string;
  category: "sofas" | "coffee-tables" | "accent-chairs" | "side-tables";
  style: string;
  price: number;
  warehouse: WarehouseName;
  material: string;
  size: [string, number, number];
  note: string;
  saleOff?: number;
};

const furniture: FurnitureRow[] = (
  [
    [
      "linen-lounge-sofa",
      "Linen Lounge Sofa",
      "sofas",
      "Loose back",
      3480,
      "New Jersey",
      "Performance linen",
      ["7x3", 7, 3],
      "Seven feet wide, which leaves a path on either side of an 8 by 10 rug.",
    ],
    [
      "oak-track-sofa",
      "Oak Track Sofa",
      "sofas",
      "Track arm",
      2890,
      "Georgia",
      "Oak frame and linen",
      ["6x3", 6, 3],
      "The track arm is low so it does not hide a medallion rug behind it.",
    ],
    [
      "ivory-boucle-sofa",
      "Ivory Boucle Sofa",
      "sofas",
      "Boucle",
      4120,
      "Texas",
      "Boucle upholstery",
      ["8x3", 8, 3],
      "Ivory boucle wants a rug with some color, or the room goes blank.",
    ],
    [
      "walnut-shelter-sofa",
      "Walnut Shelter Sofa",
      "sofas",
      "Shelter arm",
      3760,
      "California",
      "Walnut legs and wool blend",
      ["7x3", 7, 3],
      "Shelter arms frame two people and still fit on a 9 by 12.",
    ],
    [
      "camel-slipcover-sofa",
      "Camel Slipcover Sofa",
      "sofas",
      "Slipcover",
      2640,
      "New Jersey",
      "Washable slipcover",
      ["7x3", 7, 3],
      "The slipcover comes off. The camel tone sits with apricot and sand rugs.",
    ],
    [
      "charcoal-apartment-sofa",
      "Charcoal Apartment Sofa",
      "sofas",
      "Apartment scale",
      2380,
      "Georgia",
      "Performance weave",
      ["6x3", 6, 3],
      "Scaled for a smaller living room and a 6 by 9 or 8 by 10 rug.",
    ],
    [
      "oak-coffee-table",
      "Oak Coffee Table",
      "coffee-tables",
      "Plank top",
      980,
      "Texas",
      "White oak",
      ["4x2", 4, 2],
      "Forty-eight inches long, meant to sit fully on the rug in front of a sofa.",
    ],
    [
      "travertine-coffee-table",
      "Travertine Coffee Table",
      "coffee-tables",
      "Stone top",
      1480,
      "California",
      "Travertine and oak",
      ["4x2", 4, 2],
      "The stone top is honed, not polished, so it does not glare on a pale rug.",
    ],
    [
      "walnut-oval-coffee-table",
      "Walnut Oval Coffee Table",
      "coffee-tables",
      "Oval",
      1240,
      "New Jersey",
      "Walnut",
      ["4x2", 4, 2],
      "An oval keeps knees off sharp corners when the sofa and chairs share one rug.",
    ],
    [
      "blackened-steel-coffee-table",
      "Blackened Steel Coffee Table",
      "coffee-tables",
      "Metal frame",
      860,
      "Georgia",
      "Blackened steel and oak",
      ["5x2", 5, 2],
      "The thin frame lets more of the rug show than a skirted table would.",
    ],
    [
      "reeded-oak-coffee-table",
      "Reeded Oak Coffee Table",
      "coffee-tables",
      "Reeded",
      1120,
      "Texas",
      "Reeded oak",
      ["4x2", 4, 2],
      "Reeding adds texture when the rug pattern is already quiet.",
    ],
    [
      "linen-lounge-chair",
      "Linen Lounge Chair",
      "accent-chairs",
      "Lounge",
      1280,
      "California",
      "Linen",
      ["3x3", 3, 3],
      "A chair this deep should have its front legs on the rug, not off the edge.",
    ],
    [
      "oak-spindle-chair",
      "Oak Spindle Chair",
      "accent-chairs",
      "Spindle",
      740,
      "New Jersey",
      "Oak",
      ["2x2", 2, 2],
      "Light enough to pull up to a coffee table without dragging the rug.",
    ],
    [
      "boucle-slipper-chair",
      "Boucle Slipper Chair",
      "accent-chairs",
      "Slipper",
      890,
      "Georgia",
      "Boucle",
      ["2x2", 2, 2],
      "A slipper chair for the end of a sofa, on the same rug as the sofa.",
    ],
    [
      "leather-sling-chair",
      "Leather Sling Chair",
      "accent-chairs",
      "Sling",
      1540,
      "Texas",
      "Leather and steel",
      ["3x3", 3, 3],
      "The sling sits low. Pair it with a low-pile or vintage rug.",
    ],
    [
      "cane-armchair",
      "Cane Armchair",
      "accent-chairs",
      "Cane",
      820,
      "California",
      "Cane and oak",
      ["2x2", 2, 2],
      "Cane keeps the chair visually light over a detailed medallion.",
    ],
    [
      "travertine-side-table",
      "Travertine Side Table",
      "side-tables",
      "Stone",
      540,
      "New Jersey",
      "Travertine",
      ["2x2", 2, 2],
      "A side table that can sit on the rug or just off it, beside a sofa arm.",
    ],
    [
      "oak-nesting-tables",
      "Oak Nesting Tables",
      "side-tables",
      "Nesting",
      620,
      "Georgia",
      "Oak",
      ["2x2", 2, 2],
      "The pair tucks under a console when you need the rug clear.",
    ],
    [
      "walnut-drink-table",
      "Walnut Drink Table",
      "side-tables",
      "Pedestal",
      380,
      "Texas",
      "Walnut",
      ["1x1", 1, 1],
      "Small enough to place on the rug next to a lounge chair.",
    ],
    [
      "black-metal-side-table",
      "Black Metal Side Table",
      "side-tables",
      "Metal",
      320,
      "California",
      "Blackened steel",
      ["2x1", 2, 1],
      "A narrow table for the gap between a sofa and a chair.",
    ],
  ] as const
).map(([slug, title, category, style, price, warehouse, material, size, note]) => ({
  slug,
  title,
  category,
  style,
  price,
  warehouse,
  material,
  size: [size[0], size[1], size[2]] as [string, number, number],
  note,
}));

furniture[2]!.saleOff = 0.1;
furniture[8]!.saleOff = 0.12;

const furnitureColors: Record<FurnitureRow["category"], { name: string; hex: string }[]> = {
  sofas: [
    { name: "Ivory", hex: "#f3efe6" },
    { name: "Camel", hex: "#c4a574" },
  ],
  "coffee-tables": [
    { name: "Oak", hex: "#c4a574" },
    { name: "Walnut", hex: "#6b4a32" },
  ],
  "accent-chairs": [
    { name: "Linen", hex: "#e6dfd2" },
    { name: "Oak", hex: "#b08968" },
  ],
  "side-tables": [
    { name: "Stone", hex: "#d9d3c7" },
    { name: "Walnut", hex: "#5c4030" },
  ],
};

for (const [index, piece] of furniture.entries()) {
  const [label, widthFt, lengthFt] = piece.size;
  products.push({
    id: `furn-${String(index + 1).padStart(3, "0")}`,
    slug: piece.slug,
    title: piece.title,
    type: "furniture",
    category: piece.category,
    brand: "Wool & Loom",
    description: `${piece.title} is made to sit with a rug, not on bare floor alone. ${piece.note} Dimensions are about ${widthFt} by ${lengthFt} feet. Front legs of seating should rest on the rug, with the table fully on it.`,
    basePrice: piece.price,
    referenceWidthFt: widthFt,
    referenceLengthFt: lengthFt,
    saleOff: piece.saleOff,
    images: [],
    colors: furnitureColors[piece.category],
    sizes: [{ label, widthFt, lengthFt }],
    material: piece.material,
    origin: "United States",
    pile: "None",
    style: piece.style,
    room:
      piece.category === "side-tables" || piece.category === "accent-chairs"
        ? ["Living Room", "Bedroom"]
        : ["Living Room"],
    washable: false,
    warehouse: piece.warehouse,
    stock: 2 + (index % 4),
    deliveryDays: delivery[piece.warehouse],
    rating: Number((4.5 + (index % 5) * 0.1).toFixed(1)),
    reviewCount: 4 + (index % 12),
    tags: [piece.category, piece.material.toLowerCase()],
    seoTitle: `${piece.title}`,
    seoDescription: `${piece.title} in ${piece.material.toLowerCase()}, stocked at the Wool & Loom ${piece.warehouse} warehouse.`,
  });
}

const categories: Category[] = [
  {
    id: "cat-rugs",
    slug: "rugs",
    name: "Rugs",
    type: "rug",
    intro:
      "Turkish rugs in stock at Wool & Loom warehouses in New Jersey, Georgia, Texas, and California.",
    seoText:
      "Every rug is priced from a reference size, then scaled by area. An 8 by 10 is not the same price as a 5 by 7 of the same design. Measure in feet and inches before you order.",
    faq: [
      {
        question: "How is a larger size priced?",
        answer:
          "The price of each size is the reference price times the ratio of the areas. A 9 by 12 has more square feet than an 8 by 10, so it costs more.",
      },
      {
        question: "Which warehouse ships to me?",
        answer:
          "The product page names the warehouse. New Jersey covers the Northeast, Georgia the Southeast, Texas the South Central states, and California the West.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-oushak",
    slug: "oushak",
    name: "Oushak",
    type: "rug",
    parentSlug: "rugs",
    intro: "Pale fields, soft florals, and open medallions woven in Turkey.",
    seoText:
      "Oushak rugs from Wool & Loom use ivory, apricot, and sage. They are stocked in U.S. warehouses and sold by the foot.",
    faq: [
      {
        question: "Will an Oushak look pink in photos and orange in the room?",
        answer:
          "Apricot and rose on these pieces are muted. The photos are of the actual ground color, not a stylized filter.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-vintage",
    slug: "vintage",
    name: "Vintage",
    type: "rug",
    parentSlug: "rugs",
    intro: "Older wool pieces with softened color, still sound enough to put in a living room.",
    seoText:
      "Vintage rugs at Wool & Loom are hand-knotted wool with worn, sun-faded color. Each one is a single piece, not a reproduced print.",
    faq: [
      {
        question: "Are vintage rugs one of a kind?",
        answer:
          "Yes. The size on the page is the size of that rug. We do not cut a vintage piece down to order.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-runner",
    slug: "runner",
    name: "Runners",
    type: "rug",
    parentSlug: "rugs",
    intro: "Hall and entry runners from 2 by 8 to 3 by 12 feet.",
    seoText:
      "Wool & Loom runners are sized for hallways. Leave about two inches of floor along each long edge so the runner does not touch the baseboard.",
    faq: [
      {
        question: "How wide should a hall runner be?",
        answer:
          "Most halls want a 2-foot or 3-foot width. Measure the clear width in inches and subtract about four inches so the runner is not wall to wall.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-washable",
    slug: "washable",
    name: "Washable",
    type: "rug",
    parentSlug: "rugs",
    intro: "Low-pile rugs you can wash at home on cold.",
    seoText:
      "Washable rugs are for kitchens, nurseries, and family rooms. They are not a substitute for a hand-knotted wool rug, and the page says so.",
    faq: [
      {
        question: "Can I wash a wool rug the same way?",
        answer:
          "No. Only rugs marked washable go in a home washer. Wool pieces are cleaned by quote.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-turkish",
    slug: "turkish",
    name: "Turkish",
    type: "rug",
    parentSlug: "rugs",
    intro: "Sivas, Hereke, Milas, Konya, and Dosemealti patterns in wool.",
    seoText:
      "Turkish rugs at Wool & Loom are hand-knotted or flatwoven in Turkey and held in U.S. stock.",
    faq: [
      {
        question: "Are these new or vintage?",
        answer: "The Turkish collection is newly woven. Older pieces are in Vintage.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-persian-style",
    slug: "persian-style",
    name: "Persian-style",
    type: "rug",
    parentSlug: "rugs",
    intro: "Medallion and garden layouts woven in Turkey in a Persian-style drawing.",
    seoText:
      "These are Persian-style rugs woven in Turkey, not antiques from Iran. The drawing is a medallion, garden, or Heriz-style corner.",
    faq: [
      {
        question: "Are these imported from Iran?",
        answer: "No. They are woven in Turkey for Wool & Loom and stocked in the United States.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-furniture",
    slug: "furniture",
    name: "Furniture",
    type: "furniture",
    intro: "Sofas, tables, and chairs chosen to sit on a rug, with sizes in feet.",
    seoText:
      "Wool & Loom furniture is scaled for the rugs we sell. A coffee table should sit fully on the rug. The front legs of a sofa or chair should rest on it.",
    faq: [
      {
        question: "Do you deliver furniture upstairs?",
        answer:
          "Stairs and long carries are quoted with pickup and delivery. The product price does not include a walk-up.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-sofas",
    slug: "sofas",
    name: "Sofas",
    type: "furniture",
    parentSlug: "furniture",
    intro: "Sofas from six to eight feet wide, in linen, boucle, and performance cloth.",
    seoText:
      "Place a sofa so the front legs land on the rug. An 8 by 10 usually fits a seven-foot sofa with a coffee table.",
    faq: [
      {
        question: "What rug size fits a sofa?",
        answer:
          "A seven-foot sofa usually wants an 8 by 10 or a 9 by 12 so the front legs and the coffee table share the rug.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-coffee-tables",
    slug: "coffee-tables",
    name: "Coffee Tables",
    type: "furniture",
    parentSlug: "furniture",
    intro: "Oak, walnut, travertine, and steel tables sized to sit fully on a rug.",
    seoText:
      "Coffee tables at Wool & Loom are about four to five feet long. They should sit entirely on the rug, not half on the floor.",
    faq: [
      {
        question: "Should the table match the rug?",
        answer: "No. A plain wood or stone top lets the rug be the pattern in the room.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-accent-chairs",
    slug: "accent-chairs",
    name: "Accent Chairs",
    type: "furniture",
    parentSlug: "furniture",
    intro: "Chairs meant to share the rug with the sofa, not sit off on bare floor.",
    seoText:
      "Front legs of an accent chair should rest on the same rug as the sofa so the seating reads as one group.",
    faq: [
      {
        question: "Can a chair sit half off the rug?",
        answer:
          "Put the front legs on the rug. Leaving only the back legs on makes the chair look like it slipped off.",
      },
    ],
    heroImage: "",
  },
  {
    id: "cat-side-tables",
    slug: "side-tables",
    name: "Side Tables",
    type: "furniture",
    parentSlug: "furniture",
    intro: "Small tables that can sit on a rug beside a sofa or chair.",
    seoText:
      "Side tables from Wool & Loom are small enough to place on the rug next to a seat without covering the medallion.",
    faq: [
      {
        question: "Do side tables have to match the coffee table?",
        answer: "They should share a material or a finish, not necessarily the same design.",
      },
    ],
    heroImage: "",
  },
];

const services: Service[] = [
  {
    id: "svc-cleaning",
    slug: "rug-cleaning",
    name: "Rug cleaning",
    shortDescription: "Wash and dry for wool and flatweave rugs, priced after we see the piece.",
    includes: ["Dusting and wash", "Drying on racks", "A note if the dyes are unstable"],
    process: [
      {
        title: "Tell us the size",
        text: "Send the length and width in feet and inches, plus the city for pickup.",
      },
      {
        title: "We quote",
        text: "Wool, silk, and a rug with unstable dyes are not the same job. The quote says which one you have.",
      },
      {
        title: "Pickup",
        text: "A warehouse route picks the rug up. You do not drop it at a retail counter.",
      },
      {
        title: "Wash and return",
        text: "We wash, dry fully, and bring it back. A damp rug does not go on the truck.",
      },
    ],
    faq: [
      {
        question: "Can you price cleaning from a photo?",
        answer:
          "A photo starts the quote. The final price follows the measured size and what we find in the foundation.",
      },
    ],
    image: "",
  },
  {
    id: "svc-repair",
    slug: "rug-repair",
    name: "Rug repair",
    shortDescription:
      "Fringe, edges, and reweaving, quoted from photos and the size of the damage.",
    includes: ["Edge binding", "Fringe repair", "Reweaving of small losses"],
    process: [
      {
        title: "Photograph the damage",
        text: "Show the whole rug and a close view of the fringe, edge, or hole.",
      },
      {
        title: "We quote the repair",
        text: "A worn fringe and a hole in the field are different prices.",
      },
      {
        title: "Pickup",
        text: "The same routes that deliver rugs can collect one for the workroom.",
      },
      {
        title: "Return",
        text: "We send photos when the repair is done, then schedule the return.",
      },
    ],
    faq: [
      {
        question: "Do you reweave a large loss?",
        answer:
          "Small losses, yes. A large missing section may not be worth the repair. We will say so before you approve the quote.",
      },
    ],
    image: "",
  },
  {
    id: "svc-sizing",
    slug: "custom-sizing",
    name: "Custom sizing",
    shortDescription: "Binding or serging when a wool rug needs to fit a measured floor.",
    includes: [
      "Cut and bind on suitable rugs",
      "The finished size in feet and inches",
      "A refusal if the rug should not be cut",
    ],
    process: [
      {
        title: "Measure the floor",
        text: "Give us the clear width and length in feet and inches, not a guess from a furniture plan.",
      },
      {
        title: "We say if it can be cut",
        text: "Vintage pieces and some patterns should not be cut. We will decline those.",
      },
      { title: "Quote", text: "The quote is for the cut and the binding, not for a new rug." },
      {
        title: "Finish",
        text: "The edge is bound so it does not unravel. We confirm the finished size before it ships back.",
      },
    ],
    faq: [
      {
        question: "Can every rug be cut down?",
        answer:
          "No. We will not cut a vintage rug or a piece whose pattern would be ruined. The quote is the place we say no.",
      },
    ],
    image: "",
  },
  {
    id: "svc-delivery",
    slug: "pickup-and-delivery",
    name: "Pickup and delivery",
    shortDescription:
      "Warehouse delivery and pickup for cleaning or repair, quoted by city and stairs.",
    includes: [
      "Curb or threshold delivery",
      "A quote for stairs",
      "Pickup for cleaning and repair",
    ],
    process: [
      {
        title: "Share the address",
        text: "City, floor, and whether there is an elevator or a stair turn.",
      },
      {
        title: "We quote the carry",
        text: "Street-level delivery and a walk-up are different jobs.",
      },
      {
        title: "A weekday window",
        text: "The warehouse calls with a window. Someone needs to be there.",
      },
      {
        title: "Placement",
        text: "We place the rug or furniture in the room. We do not move a household.",
      },
    ],
    faq: [
      {
        question: "Is freight free?",
        answer:
          "Standard freight is free on rugs over $1,500 inside the continental United States. Stairs, furniture, and white-glove placement are quoted.",
      },
    ],
    image: "",
  },
];

const areas: ServiceArea[] = [
  {
    state: "New Jersey",
    stateSlug: "new-jersey",
    cities: [
      { name: "Newark", slug: "newark", zipCodes: ["07102", "07103"] },
      { name: "Jersey City", slug: "jersey-city", zipCodes: ["07302"] },
      { name: "Hoboken", slug: "hoboken", zipCodes: ["07030"] },
    ],
  },
  {
    state: "New York",
    stateSlug: "new-york",
    cities: [
      { name: "New York", slug: "new-york", zipCodes: ["10001", "10011"] },
      { name: "Brooklyn", slug: "brooklyn", zipCodes: ["11201"] },
    ],
  },
  {
    state: "Pennsylvania",
    stateSlug: "pennsylvania",
    cities: [
      { name: "Philadelphia", slug: "philadelphia", zipCodes: ["19103"] },
      { name: "Pittsburgh", slug: "pittsburgh", zipCodes: ["15222"] },
    ],
  },
  {
    state: "Massachusetts",
    stateSlug: "massachusetts",
    cities: [
      { name: "Boston", slug: "boston", zipCodes: ["02108"] },
      { name: "Cambridge", slug: "cambridge", zipCodes: ["02139"] },
    ],
  },
  {
    state: "Georgia",
    stateSlug: "georgia",
    cities: [
      { name: "Atlanta", slug: "atlanta", zipCodes: ["30303", "30308"] },
      { name: "Savannah", slug: "savannah", zipCodes: ["31401"] },
    ],
  },
  {
    state: "North Carolina",
    stateSlug: "north-carolina",
    cities: [
      { name: "Charlotte", slug: "charlotte", zipCodes: ["28202"] },
      { name: "Raleigh", slug: "raleigh", zipCodes: ["27601"] },
    ],
  },
  {
    state: "Florida",
    stateSlug: "florida",
    cities: [
      { name: "Miami", slug: "miami", zipCodes: ["33131"] },
      { name: "Tampa", slug: "tampa", zipCodes: ["33602"] },
    ],
  },
  {
    state: "South Carolina",
    stateSlug: "south-carolina",
    cities: [
      { name: "Charleston", slug: "charleston", zipCodes: ["29401"] },
      { name: "Columbia", slug: "columbia", zipCodes: ["29201"] },
    ],
  },
  {
    state: "Texas",
    stateSlug: "texas",
    cities: [
      { name: "Dallas", slug: "dallas", zipCodes: ["75201"] },
      { name: "Austin", slug: "austin", zipCodes: ["78701"] },
      { name: "Houston", slug: "houston", zipCodes: ["77002"] },
    ],
  },
  {
    state: "Oklahoma",
    stateSlug: "oklahoma",
    cities: [
      { name: "Oklahoma City", slug: "oklahoma-city", zipCodes: ["73102"] },
      { name: "Tulsa", slug: "tulsa", zipCodes: ["74103"] },
    ],
  },
  {
    state: "California",
    stateSlug: "california",
    cities: [
      { name: "Los Angeles", slug: "los-angeles", zipCodes: ["90012"] },
      { name: "San Diego", slug: "san-diego", zipCodes: ["92101"] },
      { name: "San Francisco", slug: "san-francisco", zipCodes: ["94102"] },
    ],
  },
  {
    state: "Arizona",
    stateSlug: "arizona",
    cities: [
      { name: "Phoenix", slug: "phoenix", zipCodes: ["85004"] },
      { name: "Tucson", slug: "tucson", zipCodes: ["85701"] },
    ],
  },
];

const reviewBodies = [
  [
    "Worth the measured size",
    "We measured the living room in feet and inches and the 8 by 10 landed with a border of floor, as the page said.",
  ],
  [
    "Color matched the swatch",
    "The apricot is softer in the room than on a phone, which is what we wanted next to a linen sofa.",
  ],
  [
    "Arrived from New Jersey",
    "The Elizabeth warehouse shipped to Brooklyn in the window they named. No surprise freight bill.",
  ],
  [
    "Runner fits the hall",
    "The 2 by 10 left a gap at each baseboard. The door still clears the end.",
  ],
  [
    "Washable did wash",
    "Cold cycle, low dry. The stone stripe still looks even after a muddy week.",
  ],
  [
    "Vintage was one piece",
    "They did not offer to cut it, which we appreciated. The size on the page was the rug.",
  ],
  [
    "Sofa sits on the rug",
    "Front legs on the 9 by 12, coffee table fully on it. The scale note was right.",
  ],
  [
    "Quote before the wash",
    "Cleaning was quoted from the measured size, not a flat fee. The rug came back dry.",
  ],
  [
    "Fringe repair was honest",
    "They said the field was sound and only the fringe needed work. That is what they did.",
  ],
  [
    "Delivery up one flight",
    "Stairs were a separate line on the quote. The crew placed the rug and left the hallway clear.",
  ],
  ["Pile is even", "Medium pile, not the floppy high pile some photos suggest. It lies flat."],
  ["Navy runner hides dust", "A hall with a dog. The navy field does not show every print."],
  [
    "Medallion is centered",
    "We centered the sofa on the medallion. The border still showed on all four sides.",
  ],
  ["Oak table on the rug", "The coffee table sits fully on the field. No half-on, half-off look."],
  [
    "Chair legs on the rug",
    "Both front legs land on the rug with the sofa. The group reads as one.",
  ],
  ["Indigo holds up at night", "Lamps on, the ivory medallion still reads. It does not turn gray."],
  [
    "Kilim under a door",
    "Flatweave was the right call where the door swings. A thick pile would have caught.",
  ],
  [
    "Sale price was the price",
    "Checkout matched the sale price on the 8 by 10. No later adjustment.",
  ],
  [
    "Stock was real",
    "The page said the New Jersey warehouse had it. It shipped, it was not a backorder.",
  ],
  [
    "Georgia route to Charlotte",
    "Two extra days past Atlanta, which the city note warned us about.",
  ],
  ["Texas humidity note", "They held a washed rug until it was dry. We did not get a damp roll."],
  [
    "California hillside quote",
    "The quote separated the curb drop from the steps. We approved the steps.",
  ],
  [
    "Side table scale",
    "Small enough to sit on the rug beside the chair without covering the corner motif.",
  ],
  [
    "Boucle and a patterned rug",
    "Ivory boucle needed the rug to carry the color. The apricot Oushak does that.",
  ],
  [
    "Binding after a cut",
    "They declined to cut the vintage one and bound a newer wool piece instead. Correct call.",
  ],
  [
    "Review after a month",
    "The wool has not shed past the first week. Traffic shows less than I expected.",
  ],
  [
    "Measured twice",
    "The 5 by 7 is a real 5 by 7, not a rounded trade size. It fits the bedside plan.",
  ],
  [
    "Service email was specific",
    "The cleaning reply named fiber and the unstable-dye check. It was not a form letter.",
  ],
  [
    "Furniture blanket wrap",
    "The sofa arrived blanket wrapped from the warehouse, not in a torn carton on a porch.",
  ],
  [
    "Would order the next size up",
    "We almost bought the 8 by 10 and were glad the area price for the 9 by 12 was spelled out.",
  ],
];

const reviews: Review[] = reviewBodies.map(([title, body], index) => {
  const product = products[index % 24]!;
  const service = services[index % services.length]!;
  const useService = index >= 24;
  return {
    id: `rev-${String(index + 1).padStart(3, "0")}`,
    targetType: useService ? "service" : "product",
    targetId: useService ? service.id : product.id,
    author: ["A. Patel", "M. Alvarez", "J. Brooks", "S. Nguyen", "R. Cohen", "L. Ibrahim"][
      index % 6
    ]!,
    city: ["Brooklyn", "Atlanta", "Dallas", "Los Angeles", "Philadelphia", "Charlotte"][index % 6]!,
    rating: 4 + (index % 2),
    title,
    body,
    date: `2026-${String((index % 9) + 1).padStart(2, "0")}-14`,
  };
});

const posts: BlogPost[] = [
  {
    id: "post-001",
    slug: "measure-a-room-in-feet-and-inches",
    title: "Measure a room for a rug in feet and inches",
    excerpt:
      "A tape in feet and inches, the clear floor, and why the rug should not touch the baseboard.",
    author: "Wool & Loom Studio",
    readMinutes: 6,
    publishedAt: "2026-02-11",
    category: "Sizing",
    sections: [
      {
        heading: "Measure the clear floor",
        paragraphs: [
          "Measure the floor you can actually use, not the room from wall to wall if a hearth, a door swing, or a built-in takes a piece of it. Write the width and the length in feet and inches.",
          "A rug that touches the baseboard on all sides looks wall-to-wall and wears at the edges. Leave a border of bare floor. In a living room that is often 8 to 18 inches, depending on the room.",
        ],
      },
      {
        heading: "Put the furniture on the rug",
        paragraphs: [
          "Front legs of the sofa and chairs should sit on the rug. The coffee table should sit fully on it. If only the table fits, the rug is too small for that seating group.",
          "An 8 by 10 often fits a seven-foot sofa with a four-foot coffee table. A 9 by 12 is the next step when the chairs also need to land on the rug.",
        ],
      },
      {
        heading: "Price follows area",
        paragraphs: [
          "Wool & Loom prices each size from a reference size times the area ratio. The 5 by 7 of a design is not the same price as the 8 by 10. The product page is the price for the size you select.",
        ],
      },
    ],
    relatedProductSlugs: ["pale-oushak-field", "sivas-medallion"],
    relatedServiceSlug: "custom-sizing",
  },
  {
    id: "post-002",
    slug: "wool-pile-in-a-busy-room",
    title: "Wool pile in a room that actually gets used",
    excerpt:
      "What medium pile does under a dining table, a sofa, and a dog that sleeps on the rug.",
    author: "Wool & Loom Studio",
    readMinutes: 7,
    publishedAt: "2026-03-04",
    category: "Care",
    sections: [
      {
        heading: "Low pile is not a lesser rug",
        paragraphs: [
          "A vintage wool rug is often low because it has been walked on. That is useful in a dining room, where chairs need to slide, and in a hall, where a thick pile catches.",
          "Medium pile is the everyday living-room height on our new Turkish pieces. It is not the high, floppy pile that looks soft in a photo and mats under a table.",
        ],
      },
      {
        heading: "Traffic shows first at the turn",
        paragraphs: [
          "The wear line appears where people turn into the room, not in the center under the table. A darker field or a vintage abrash hides that longer than a plain ivory ground.",
          "Rotate the rug once or twice a year if the room has one path. Wool does not need a weekly shampoo. It needs dust out of it and a real wash when it is dirty.",
        ],
      },
    ],
    relatedProductSlugs: ["bergama-vintage", "smoke-vintage"],
    relatedServiceSlug: "rug-cleaning",
  },
  {
    id: "post-003",
    slug: "what-washable-means",
    title: "What washable means on a rug label",
    excerpt:
      "A washable rug can go in a home washer. A wool rug cannot, even if both look soft in the photo.",
    author: "Wool & Loom Studio",
    readMinutes: 5,
    publishedAt: "2026-04-16",
    category: "Care",
    sections: [
      {
        heading: "The fiber is the rule",
        paragraphs: [
          "Rugs we mark washable are a low recycled-polyester pile made for a cold wash. Wool, even a flatweave kilim, is not in that group. Washing wool at home felts it or releases unstable dyes.",
          "If a wool rug is dirty, ask for a cleaning quote. Send the size in feet and inches and the city. We price the wash after that, not from a flat 'any rug' fee.",
        ],
      },
      {
        heading: "Where a washable rug earns its place",
        paragraphs: [
          "A nursery, a kitchen sitting area, and a room where shoes come off at the door are the right rooms. A formal living room that wants a medallion still wants wool.",
        ],
      },
    ],
    relatedProductSlugs: ["cloud-washable", "stone-stripe-washable"],
    relatedServiceSlug: "rug-cleaning",
  },
  {
    id: "post-004",
    slug: "furniture-that-sits-with-a-rug",
    title: "Furniture that sits with a rug",
    excerpt:
      "Front legs on the rug, the coffee table fully on it, and a side table that does not cover the border.",
    author: "Wool & Loom Studio",
    readMinutes: 6,
    publishedAt: "2026-05-20",
    category: "Rooms",
    sections: [
      {
        heading: "One rug for the seating group",
        paragraphs: [
          "The sofa, the chairs, and the coffee table should share a rug. Splitting them onto bare floor makes the room look unfinished even when the furniture is good.",
          "A seven-foot sofa with a four-foot table usually wants an 8 by 10. Add two chairs and you are often at a 9 by 12.",
        ],
      },
      {
        heading: "Let the rug be the pattern",
        paragraphs: [
          "A plain oak or travertine table shows more of the rug than a skirted one. Ivory boucle needs the rug to carry the color. A charcoal sofa can take a pale Oushak without a fight.",
        ],
      },
    ],
    relatedProductSlugs: ["linen-lounge-sofa", "oak-coffee-table", "linen-lounge-chair"],
    relatedServiceSlug: "pickup-and-delivery",
  },
  {
    id: "post-005",
    slug: "which-warehouse-ships",
    title: "Which warehouse ships your rug",
    excerpt:
      "New Jersey, Georgia, Texas, and California each hold stock. The product page names the one that has the piece.",
    author: "Wool & Loom Studio",
    readMinutes: 5,
    publishedAt: "2026-06-09",
    category: "Shipping",
    sections: [
      {
        heading: "Stock is in a building, not a promise",
        paragraphs: [
          "If the page says New Jersey, the rug is in Elizabeth. Georgia is Fairburn, Texas is Grand Prairie, California is Ontario. We do not list a rug as in stock when it is still on the water.",
          "Delivery days on the page are the warehouse window, such as 1–3 days from New Jersey. A city farther from that warehouse can add a transit day. The city pages say so.",
        ],
      },
      {
        heading: "Freight and stairs are different",
        paragraphs: [
          "Standard freight is free on rugs over $1,500 in the continental United States. Stairs, a long carry, and furniture placement are quoted with pickup and delivery.",
        ],
      },
    ],
    relatedProductSlugs: ["hereke-border", "kars-hallway-runner"],
    relatedServiceSlug: "pickup-and-delivery",
  },
  {
    id: "post-006",
    slug: "when-not-to-cut-a-rug",
    title: "When not to cut a rug down",
    excerpt:
      "Custom sizing is for a wool rug that can lose an edge. It is not for a vintage piece or a medallion you would slice in half.",
    author: "Wool & Loom Studio",
    readMinutes: 6,
    publishedAt: "2026-07-22",
    category: "Sizing",
    sections: [
      {
        heading: "Measure before you ask for a cut",
        paragraphs: [
          "Send the clear floor in feet and inches. A cut is permanent. We would rather you buy the next stocked size than take an inch off a rug that did not need it.",
        ],
      },
      {
        heading: "What we will refuse",
        paragraphs: [
          "We do not cut vintage rugs. We do not cut through a central medallion. If the pattern only works whole, the quote says no.",
          "When a newer wool rug can be bound down, the quote is for the cut and the binding. The finished size is confirmed before it comes back.",
        ],
      },
    ],
    relatedProductSlugs: ["konya-kilim", "dosemealti-field"],
    relatedServiceSlug: "custom-sizing",
  },
];

const rugCount = (name: WarehouseName) =>
  products.filter((item) => item.type === "rug" && item.warehouse === name).length;

const warehouses = (Object.keys(delivery) as WarehouseName[]).map((name) => ({
  name,
  state: name,
  rugCount: rugCount(name),
  deliveryDays: delivery[name],
}));

mkdirSync(root, { recursive: true });

function write(name: string, data: unknown) {
  writeFileSync(path.join(root, name), `${JSON.stringify(data, null, 2)}\n`);
}

write("products.json", products);
write("categories.json", categories);
write("services.json", services);
write("service-areas.json", areas);
write("reviews.json", reviews);
write("blog-posts.json", posts);
write("warehouses.json", warehouses);

console.log(
  `seeded ${products.filter((item) => item.type === "rug").length} rugs, ${products.filter((item) => item.type === "furniture").length} furniture, ${services.length} services, ${areas.length} areas, ${reviews.length} reviews, ${posts.length} posts, ${warehouses.length} warehouses`,
);
