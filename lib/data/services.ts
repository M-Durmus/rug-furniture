import type { City, Service } from "@/lib/data/types";
import { getWarehouse } from "@/lib/data/facets";

export const services: Service[] = [
  {
    slug: "rug-cleaning",
    name: "Rug cleaning",
    serviceType: "Rug cleaning",
    summary: "Dust, wash, and dry wool rugs in our own warehouses. The price is a quote after we see the piece.",
    description:
      "Wool & Loom cleans rugs from our own stock and rugs you already own. We quote after pickup or after you send measurements and photos, because soil, dye, and fringe change the work.",
    image: "/images/rugs/sivas-medallion.png",
    imageAlt: "Ivory and indigo Sivas Medallion rug, the kind of wool pile we wash in our warehouses",
    steps: [
      { name: "Tell us the size", text: "Send the length and width in feet and inches, plus the fiber if you know it." },
      { name: "We quote the wash", text: "A specialist prices dusting, washing, and drying from the size and the condition." },
      { name: "Pickup from your door", text: "We collect the rug on a scheduled weekday and bring it to the warehouse that serves your city." },
      { name: "Wash and dry flat", text: "Wool is washed, rinsed, and dried under tension so the rug keeps its size." },
    ],
    faqs: [
      {
        question: "How is rug cleaning priced?",
        answer: "Cleaning is quoted from the size in square feet, the fiber, and how soiled the rug is. We do not publish a flat rate.",
      },
      {
        question: "Can you clean a rug you did not sell?",
        answer: "Yes. Most of the rugs we wash were not bought from Wool & Loom. We need the size and a few photos before we quote.",
      },
      {
        question: "How long does a wash take?",
        answer: "A typical wool rug is back in two to three weeks, including drying. Very large or unstable pieces take longer, and we say so in the quote.",
      },
    ],
  },
  {
    slug: "rug-repair",
    name: "Rug repair",
    serviceType: "Rug repair",
    summary: "Fringe, edge binding, and reweaving, quoted after we inspect the damage.",
    description:
      "We repair ends, selvages, holes, and worn centers. The quote follows an in-person look or clear photos, because a small hole in the field is a different job from a new end stop.",
    image: "/images/rugs/konya-kilim.png",
    imageAlt: "Terracotta Konya kilim with a flatweave edge, the kind of end we rebind and repair",
    steps: [
      { name: "Photograph the damage", text: "Show the whole rug and a close view of the worn area, with a tape measure in the frame." },
      { name: "We inspect and quote", text: "Repair is priced by the hours of reweaving or the length of new binding, not by a menu price." },
      { name: "Work happens in the warehouse", text: "The rug goes to the warehouse that serves your region. We do not repair in your home." },
      { name: "You approve before we start", text: "If the work is larger than the quote described, we pause and ask before continuing." },
    ],
    faqs: [
      {
        question: "Do you replace fringe?",
        answer: "Yes, when the foundation is sound. If the end is unraveling into the field, we quote a new end stop instead of fringe alone.",
      },
      {
        question: "Can every hole be rewoven?",
        answer: "Small holes in wool pile usually can. Large losses, dry rot, or painted foundation may not be worth rebuilding. We will say so.",
      },
      {
        question: "Is repair available in every city you serve?",
        answer: "Pickup is local. The repair itself is done at the regional warehouse in New Jersey, Georgia, Texas, or California.",
      },
    ],
  },
  {
    slug: "custom-sizing",
    name: "Custom sizing",
    serviceType: "Custom rug sizing",
    summary: "Cut and bind a wool rug to the foot-and-inch size your room actually needs.",
    description:
      "Some rooms do not match a stock size. We cut and bind selected wool rugs to a measurement you take in feet and inches, then quote the labor before any cut is made.",
    image: "/images/rugs/grid-flatweave.png",
    imageAlt: "Charcoal grid flatweave, a wool construction we can cut and bind to a custom size",
    steps: [
      { name: "Measure the floor", text: "Record length and width in feet and inches at the spot where the rug will lie, not the whole room." },
      { name: "Choose a rug we can cut", text: "Not every weave can be cut. We only offer this on pieces with a stable foundation." },
      { name: "Approve the quote", text: "The quote covers cutting, binding, and the change in the rug's value. Cutting is final." },
      { name: "We bind the new edge", text: "The new edge is bound in the warehouse and the finished size is written on the paperwork." },
    ],
    faqs: [
      {
        question: "Can you make a runner from a room-size rug?",
        answer: "Sometimes. The drawing has to survive the cut. We will tell you if the medallion or border would be lost.",
      },
      {
        question: "Do you cut vintage rugs?",
        answer: "Rarely. We would rather sell a vintage rug whole. If a cut is the only way it fits a stair or hall, we explain what you lose.",
      },
      {
        question: "How should I measure?",
        answer: "Use a steel tape. Measure the footprint you want, then leave the floor border your doors and furniture need. Our measuring guide walks through it.",
      },
    ],
  },
  {
    slug: "pickup-and-delivery",
    name: "Pickup and delivery",
    serviceType: "Rug pickup and delivery",
    summary: "White-glove pickup and delivery for rugs and furniture, quoted by city and flight of stairs.",
    description:
      "We deliver from the warehouse that holds the piece and we pick up rugs for cleaning or repair. Stairs, elevators, and long carries change the quote, so we ask before we schedule.",
    image: "/images/furniture/boucle-sofa.png",
    imageAlt: "Ivory boucle sofa, delivered blanket-wrapped from the Wool & Loom warehouse that serves your city",
    steps: [
      { name: "Share the address", text: "Tell us the city, the floor, and whether there is an elevator or a stair turn." },
      { name: "We quote the carry", text: "Street-level delivery and a walk-up are different jobs. The quote names which one you are booking." },
      { name: "A weekday window", text: "The warehouse calls with a window. Someone needs to be there to receive the piece." },
      { name: "Placement, not installation", text: "We place rugs and furniture in the room. We do not mount art, wire lighting, or move a full household." },
    ],
    faqs: [
      {
        question: "Is freight free?",
        answer: "Standard freight is free on rugs over $1,500 inside the continental United States. White-glove placement, stairs, and furniture are quoted.",
      },
      {
        question: "Which warehouse serves me?",
        answer: "New Jersey serves the Northeast, Georgia the Southeast, Texas the South Central states, and California the West. The city page names the warehouse.",
      },
      {
        question: "Do you ship outside the United States?",
        answer: "No. Wool & Loom sells and delivers inside the United States only.",
      },
    ],
  },
];

export const cities: City[] = [
  {
    slug: "newark",
    name: "Newark",
    state: "New Jersey",
    warehouseId: "nj",
    nearby: ["new-york"],
    note: "Newark routes leave the Elizabeth warehouse on weekday mornings, usually with same-week pickup inside Essex County.",
  },
  {
    slug: "new-york",
    name: "New York",
    state: "New York",
    warehouseId: "nj",
    nearby: ["newark"],
    note: "Manhattan and Brooklyn deliveries are scheduled from Elizabeth. Elevator buildings need a two-hour window and a certificate of insurance on request.",
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    state: "Georgia",
    warehouseId: "ga",
    nearby: ["charlotte"],
    note: "Atlanta stops run from Fairburn. Inside the perimeter we can often place a rug two business days after the quote is approved.",
  },
  {
    slug: "charlotte",
    name: "Charlotte",
    state: "North Carolina",
    warehouseId: "ga",
    nearby: ["atlanta"],
    note: "Charlotte is served from the Georgia warehouse. Plan on an extra transit day compared with Atlanta.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "Texas",
    warehouseId: "tx",
    nearby: ["austin", "houston"],
    note: "Dallas and Fort Worth are same-week routes from Grand Prairie. High-rise freight elevators should be reserved before we arrive.",
  },
  {
    slug: "austin",
    name: "Austin",
    state: "Texas",
    warehouseId: "tx",
    nearby: ["dallas", "houston"],
    note: "Austin deliveries leave Grand Prairie overnight. We ask about steep drives and tight stair turns before we quote.",
  },
  {
    slug: "houston",
    name: "Houston",
    state: "Texas",
    warehouseId: "tx",
    nearby: ["dallas", "austin"],
    note: "Houston routes cover the Loop and nearby suburbs. Humidity is hard on a damp rug, so washed pieces stay in the warehouse until they are fully dry.",
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "California",
    warehouseId: "ca",
    nearby: ["san-diego"],
    note: "Los Angeles deliveries start in Ontario. Hillside streets and long carries up steps are quoted separately from the curb.",
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "California",
    warehouseId: "ca",
    nearby: ["los-angeles"],
    note: "San Diego is a scheduled run from the California warehouse, typically once or twice a week depending on the route.",
  },
];

export function getServices(): Service[] {
  return services;
}

export function getService(slug: string): Service | undefined {
  return services.find((item) => item.slug === slug);
}

export function getServicesBySlugs(list: string[]): Service[] {
  return list.flatMap((slug) => {
    const service = getService(slug);
    return service ? [service] : [];
  });
}

export function getCities(): City[] {
  return cities;
}

export function getCity(slug: string): City | undefined {
  return cities.find((item) => item.slug === slug);
}

export function getNearbyCities(city: City): City[] {
  return city.nearby.flatMap((slug) => {
    const nearby = getCity(slug);
    return nearby ? [nearby] : [];
  });
}

export function getWarehouseForCity(city: City) {
  return getWarehouse(city.warehouseId);
}
