import type { Faq, Guide, NavLink, Post } from "@/lib/data/types";

export const posts: Post[] = [
  {
    slug: "size-a-rug-in-feet-and-inches",
    title: "Size a rug in feet and inches",
    description:
      "How to measure a seating area in feet and inches and match it to a stock Wool & Loom rug.",
    excerpt:
      "Measure the footprint of the furniture, not the whole room, then match that number to a stock size.",
    date: "2026-02-12",
    updated: "2026-09-02",
    productSlugs: ["sivas-medallion", "yahyali-medallion", "coastal-stripe"],
    sections: [
      {
        heading: "Measure the furniture, not the walls",
        paragraphs: [
          "A living room rug should hold the front legs of the sofa and chairs. Measure that group in feet and inches, then add the floor border you want, usually 8 to 18 inches at the walls.",
          "Write the numbers as feet and inches, the way our stock is listed. An 8 by 10 foot rug is 96 inches by 120 inches.",
        ],
      },
      {
        heading: "Leave room for doors",
        paragraphs: [
          "A rug that runs under a swinging door will wear through at the edge and can keep the door from latching. Stop the rug at least 2 inches short of the arc.",
          "In a hall, keep about 3 inches of bare floor on each side of a runner so shoes do not catch the edge.",
        ],
      },
      {
        heading: "Use a stock size when you can",
        paragraphs: [
          "Stock sizes ship from the warehouse that already holds them. Custom cutting is a separate quote, and the cut cannot be undone.",
          "If you are between sizes, choose the smaller rug and let the floor show. A rug that crowds every wall looks larger than the room.",
        ],
      },
    ],
  },
  {
    slug: "wool-pile-in-a-busy-room",
    title: "Wool pile in a busy room",
    description:
      "What to expect from wool pile under daily traffic, and when to ask Wool & Loom for a cleaning quote.",
    excerpt:
      "Wool hides footprints better than it hides grit. Vacuum with the nap, rotate the rug, and wash it before the soil reaches the foundation.",
    date: "2026-05-20",
    updated: "2026-05-20",
    productSlugs: ["usak-angora", "bergama-vintage", "library-grid"],
    sections: [
      {
        heading: "Grit is the problem, not shoes",
        paragraphs: [
          "Fine grit works down to the knots and cuts them. A weekly vacuum, moved with the nap rather than against it, takes that grit out.",
          "Skip a beater bar on fringe and on flatweave kilims. The bar pulls ends loose.",
        ],
      },
      {
        heading: "Rotate once a season",
        paragraphs: [
          "Turn the rug so the same path is not always in the same place. Ivory and sage fields show a track sooner than charcoal, but every wool rug wears where people walk.",
          "If the pile looks matted in a lane, a wash and a careful drying can lift it. That is a quote, not a standard fee, because size and soil change the job.",
        ],
      },
      {
        heading: "Blot, then stop",
        paragraphs: [
          "For a spill, blot with a dry white cloth. Do not rub, and do not pour cleaning solution onto wool.",
          "If the spot remains, send us the size and a photo. We would rather quote a proper wash than have a home remedy set the stain.",
        ],
      },
    ],
  },
  {
    slug: "furniture-that-sits-with-a-rug",
    title: "Furniture that sits with a rug",
    description: "How Wool & Loom scales sofas, tables, and benches to the rugs they sit on.",
    excerpt:
      "Match the coffee table to the rug's field, and keep chair legs either fully on the pile or fully off it.",
    date: "2026-08-08",
    updated: "2026-08-08",
    productSlugs: ["boucle-sofa", "oak-coffee-table", "oak-bench"],
    sections: [
      {
        heading: "Legs all on, or all off",
        paragraphs: [
          "A chair with two legs on the rug and two on the floor rocks, and it dents the edge of the pile. Place seating fully on the rug or fully beside it.",
          "Our boucle sofa is 84 inches wide. On an 8 by 10 foot rug it leaves room for a pair of chairs and a border of floor.",
        ],
      },
      {
        heading: "Tables need a flat lie",
        paragraphs: [
          "A thick pile can make a table rock. Check the lie before you commit to a glass or stone top. Flatweaves and low wool are easier under a dining table.",
          "The oak coffee table is 16 inches high, which clears a typical seat and sits inside the field of a 6 by 9 or larger rug.",
        ],
      },
      {
        heading: "Delivery is part of the fit",
        paragraphs: [
          "Measure doorways and stair turns in inches before you order a sideboard or sofa. We quote the carry from the warehouse that holds the piece.",
          "Rugs over $1,500 ship with free standard freight in the continental United States. Furniture placement is always quoted.",
        ],
      },
    ],
  },
];

export const guides: Guide[] = [
  {
    slug: "measure-for-a-rug",
    title: "How to measure for a rug",
    description:
      "Measure a room in feet and inches and choose a Wool & Loom stock size that fits doors, seating, and halls.",
    excerpt:
      "A steel tape, the furniture footprint, and a door swing are enough to pick a stock size.",
    date: "2026-01-16",
    totalTime: "PT20M",
    tools: ["Steel tape measure", "Paper and pencil", "Painter's tape"],
    productSlugs: ["sivas-medallion", "kars-runner", "coastal-stripe"],
    intro: [
      "Stock rugs are listed in feet and inches. Measure the floor you want to cover, not the whole room, and write both units down.",
      "This takes about 20 minutes in a typical living room.",
    ],
    steps: [
      {
        name: "Clear the footprint",
        text: "Move small tables aside so the tape lies flat. You are measuring the area the rug should occupy, including the space under front furniture legs.",
      },
      {
        name: "Measure length and width",
        text: "Hook the tape at one edge of the footprint and read feet and inches at the other. Measure both directions twice. Use the smaller reading if the walls are out of square.",
      },
      {
        name: "Mark the door swing",
        text: "Open every door that crosses the footprint. Keep the rug at least 2 inches outside that arc. A hall runner should leave about 3 inches of floor on each side.",
      },
      {
        name: "Match a stock size",
        text: "Compare your numbers with our size pages, from 2 by 3 feet through 9 by 12 feet, plus runners. If you are between sizes, choose the smaller one.",
      },
      {
        name: "Ask before a custom cut",
        text: "If no stock size works, request a custom-sizing quote. Do not assume every rug can be cut. We confirm the weave before anyone binds a new edge.",
      },
    ],
  },
  {
    slug: "care-for-a-wool-rug",
    title: "How to care for a wool rug",
    description:
      "Vacuum, rotate, and blot a wool rug, and know when to book a Wool & Loom cleaning quote.",
    excerpt:
      "Weekly vacuuming and a seasonal rotation keep wool pile even. Wash it when grit reaches the foundation.",
    date: "2026-03-04",
    totalTime: "PT30M",
    tools: ["Vacuum with suction, beater bar off", "White cotton cloths", "Rug pad"],
    productSlugs: ["bergama-vintage", "hemp-kilim", "library-grid"],
    intro: [
      "Wool wears well when grit stays out of the foundation. Most care is ordinary housekeeping, not specialty products.",
      "Set aside half an hour for a thorough first pass in a room that already has furniture on the rug.",
    ],
    steps: [
      {
        name: "Vacuum with the nap",
        text: "Use suction. Turn the beater bar off, especially on fringe and kilims. Move in the direction of the pile, then empty the canister so you are not blowing dust back.",
      },
      {
        name: "Use a pad",
        text: "A pad keeps the rug from walking and takes some grit before it reaches the knots. Fit the pad slightly smaller than the rug so it does not show at the edges.",
      },
      {
        name: "Rotate each season",
        text: "Turn the rug 180 degrees so traffic is not always on the same lane. Check the floor for damp, particularly on a slab or in a basement room.",
      },
      {
        name: "Blot spills immediately",
        text: "Press a dry white cloth onto the spill. Do not scrub and do not apply bleach, vinegar, or a steam cleaner to wool.",
      },
      {
        name: "Book a wash before the foundation is dark",
        text: "If the back of the rug is soiled or the pile stays matted after vacuuming, ask for a cleaning quote. Send the size in feet and inches and a photo of the back.",
      },
    ],
  },
  {
    slug: "rug-size-guide",
    title: "Rug size guide",
    description: "Choose a Wool & Loom stock size that leaves a border of bare floor in a living room, bedroom, or dining room.",
    excerpt: "Leave 2 feet in a living room, 1.5 feet in a bedroom, and 3 feet in a dining room, then take the largest stock size that fits.",
    date: "2026-01-20",
    totalTime: "PT15M",
    tools: ["Steel tape", "The rug size calculator"],
    productSlugs: ["sivas-medallion", "kars-runner"],
    intro: [
      "A rug that reaches every baseboard looks like wall-to-wall carpet and wears at the edge. The border of bare floor is part of the size, not leftover space.",
      "Use feet. Our stock pages are 2 by 3 through 10 by 14, plus runners.",
    ],
    steps: [
      { name: "Measure the clear floor", text: "Write width and length in feet. Skip the hearth, the door swing, and any built-in that the rug cannot cover." },
      { name: "Subtract the border", text: "A living room keeps 2 feet of floor on each side. A bedroom keeps 1.5 feet. A dining room keeps 3 feet so chairs can pull out and still sit on the rug." },
      { name: "Take the largest stock size that fits", text: "Compare what is left with the size pages. If you are between two sizes, choose the smaller one. The calculator does this for you." },
      { name: "Ask before a cut", text: "A custom size is a quote, and it is permanent. We do not cut a vintage rug or a medallion through the center." },
    ],
  },
  {
    slug: "rug-care-guide",
    title: "Rug care guide",
    description: "How to vacuum, rotate, and blot a Wool & Loom wool rug, and when to ask for a cleaning quote.",
    excerpt: "Suction, a seasonal turn, and a dry blot. A wash is quoted from the size and the soil, not from a flat fee.",
    date: "2026-03-11",
    totalTime: "PT25M",
    tools: ["Vacuum with the beater bar off", "White cotton cloth", "Rug pad"],
    productSlugs: ["bergama-vintage", "hemp-kilim"],
    intro: [
      "Wool does not need a weekly shampoo. It needs grit out of the foundation and a real wash when the back is dark.",
      "Washable rugs on this site are a different fiber. Do not put a wool rug in a home washer.",
    ],
    steps: [
      { name: "Vacuum with suction", text: "Turn the beater bar off on fringe and on kilim. Move with the nap. Empty the canister so dust is not blown back." },
      { name: "Pad the rug", text: "A pad slightly smaller than the rug keeps it from walking. Ask about a pad with the order. It is quoted, not a listed price." },
      { name: "Rotate once a season", text: "Turn the rug so one path is not always in the same lane. Check a slab or a basement for damp before you put it back." },
      { name: "Blot a spill and stop", text: "Press a dry white cloth. Do not rub, and do not use bleach, vinegar, or a steam cleaner on wool." },
      { name: "Book a wash from the warehouse", text: "Send the size in feet and inches, the city, and a photo of the back. Cleaning is priced after that." },
    ],
  },
  {
    slug: "rug-buying-guide",
    title: "Rug buying guide",
    description: "How to buy a Turkish rug from Wool & Loom stock: size, fiber, warehouse, and what a quote covers.",
    excerpt: "Buy a piece we already hold in the United States. Match the size, read the fiber, and treat care as a separate quote.",
    date: "2026-04-02",
    totalTime: "PT20M",
    tools: ["Room measurements in feet", "The product page warehouse line"],
    productSlugs: ["pale-oushak-field", "linen-lounge-sofa"],
    intro: [
      "The rugs on this site are in Elizabeth, Fairburn, Grand Prairie, or Ontario. A page does not list a rug that is still on the water.",
      "Furniture is chosen to sit with those rugs. Front legs go fully on the pile or fully off it.",
    ],
    steps: [
      { name: "Size the floor first", text: "Use the size guide or the calculator. An 8 by 10 is not the same price as a 5 by 7 of the same design, because price follows area." },
      { name: "Read the fiber", text: "Wool is the usual Turkish pile. A washable rug is recycled polyester and can take a cold wash. Do not mix those care rules." },
      { name: "Check the warehouse", text: "The product page names the building and the delivery window. Standard freight on rugs is free. Stairs and furniture placement are quoted." },
      { name: "Order a swatch if the color is the question", text: "Wool swatches ship free from the product page. The swatch is not a charge and it is not the rug." },
      { name: "Keep care off the product price", text: "Cleaning, repair, custom sizing, and pickup are quoted after the size and the city. They are not added as a flat fee at checkout." },
    ],
  },
];

export const faqs: Faq[] = [
  {
    question: "Where are the rugs shipped from?",
    answer:
      "From our warehouses in Elizabeth, New Jersey; Fairburn, Georgia; Grand Prairie, Texas; and Ontario, California. The product page names the warehouse that holds that piece.",
  },
  {
    question: "Do you charge sales tax?",
    answer:
      "Checkout shows an estimated tax of 8 percent on the taxable amount. A card is not charged until Stripe is connected. Prices on the site are in U.S. dollars.",
  },
  {
    question: "How are rug care services priced?",
    answer:
      "Cleaning, repair, custom sizing, and white-glove pickup are quoted after we know the size, the fiber, and the city. There is no flat rate on those services.",
  },
  {
    question: "What if the rug I want is in another state?",
    answer:
      "We can transfer a piece between warehouses or ship it to you. Standard freight is free on rugs over $1,500 inside the continental United States. Furniture delivery is quoted.",
  },
  {
    question: "Can I return a rug?",
    answer:
      "Unused rugs in the condition we delivered can be returned within 100 days. Return freight is quoted. Custom-cut rugs cannot be returned.",
  },
  {
    question: "Do you sell outside the United States?",
    answer:
      "No. The site, the warehouses, and the rug care routes are for customers in the United States. Sizes are in feet and inches and prices are in U.S. dollars.",
  },
];

export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/rugs", label: "All rugs" },
      { href: "/furniture", label: "Furniture" },
      { href: "/rugs/size/8x10", label: "8 × 10 rugs" },
      { href: "/rugs/style/persian", label: "Persian rugs" },
      { href: "/rugs/color/ivory", label: "Ivory rugs" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/rug-cleaning", label: "Rug cleaning" },
      { href: "/services/rug-repair", label: "Rug repair" },
      { href: "/services/custom-sizing", label: "Custom sizing" },
      { href: "/services/pickup-and-delivery", label: "Pickup and delivery" },
      { href: "/services/rug-cleaning/new-york/new-york", label: "Cleaning in New York" },
      {
        href: "/services/pickup-and-delivery/california/los-angeles",
        label: "Delivery in Los Angeles",
      },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Journal" },
      { href: "/guides", label: "Guides" },
      { href: "/guides/rug-size-guide", label: "Rug size guide" },
      { href: "/guides/rug-care-guide", label: "Rug care guide" },
      { href: "/guides/rug-buying-guide", label: "Rug buying guide" },
      { href: "/guides/measure-for-a-rug", label: "Measure for a rug" },
      { href: "/help", label: "Help" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/inspiration", label: "Inspiration" },
      { href: "/reviews", label: "Reviews" },
      { href: "/help/shipping", label: "Shipping" },
      { href: "/help/returns", label: "Returns" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export const popularLinks: NavLink[] = [
  { href: "/rugs", label: "Shop Turkish rugs" },
  { href: "/rugs/size/8x10", label: "8 × 10 rugs" },
  { href: "/rugs/style/persian", label: "Persian rugs" },
  { href: "/furniture", label: "Furniture" },
  { href: "/services/rug-cleaning", label: "Rug cleaning" },
  { href: "/guides/measure-for-a-rug", label: "Measuring guide" },
];

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((item) => item.slug === slug);
}

export function getGuides(): Guide[] {
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((item) => item.slug === slug);
}

export function getFaqs(): Faq[] {
  return faqs;
}
