import type { ProductFilters } from "@/types";

export type GuidePlan = {
  text: string;
  suggestions: string[];
  shop?: { href: string; label: string };
  filters: ProductFilters;
  sizeLabel?: string;
  sale?: boolean;
};

const rooms = [
  {
    test: /living|lounge|family room/,
    room: "Living Room",
    sizeLabel: "8x10",
    shop: { href: "/rugs/size/8x10", label: "Shop 8×10 rugs" },
    text: "For a sofa and two chairs, start with an 8×10. The front legs of the sofa should sit on the rug, with a border of bare floor at the walls. If the sofa is longer than 8 feet, a 9×12 keeps those legs on the pile.",
    suggestions: ["Show a 9×12", "Washable living room rugs", "Sofas", "Ivory rugs"],
  },
  {
    test: /bedroom|bed\b/,
    room: "Bedroom",
    sizeLabel: "5x7",
    shop: { href: "/rugs/size/5x7", label: "Shop 5×7 rugs" },
    text: "A 5×7 sits under the lower two-thirds of a queen bed. Choose an 8×10 if you want the nightstands on the rug as well.",
    suggestions: ["Show an 8×10", "Washable rugs", "Ivory rugs", "Vintage rugs"],
  },
  {
    test: /dining/,
    room: "Dining Room",
    sizeLabel: "6x9",
    shop: { href: "/rugs/size/6x9", label: "Shop 6×9 rugs" },
    text: "The rug should extend about 2 feet past the table on every side, so chairs stay on the pile when someone stands. A 6×9 fits many tables. A longer table needs an 8×10.",
    suggestions: ["Show an 8×10", "Dining chairs", "Oushak rugs"],
  },
  {
    test: /hall|entry|runner|corridor/,
    shop: { href: "/rugs/runner", label: "Shop runners" },
    filters: { type: "rug" as const, category: "runner" },
    text: "Hall runners here are about 2 feet wide. Leave a few inches of bare floor on each side so the runner does not touch the walls.",
    suggestions: ["Living room", "Washable rugs", "Vintage rugs"],
  },
];

const furniture = [
  {
    test: /coffee/,
    category: "coffee-tables",
    shop: { href: "/furniture/coffee-tables", label: "Shop coffee tables" },
    text: "A coffee table should sit fully on the rug, usually 14 to 18 inches from the sofa. These are low tables sized for an 8×10.",
    suggestions: ["Sofas", "8×10 rugs", "Side tables"],
  },
  {
    test: /side table|end table|nightstand/,
    category: "side-tables",
    shop: { href: "/furniture/side-tables", label: "Shop side tables" },
    text: "A side table belongs on the rug beside a chair or sofa, not half on the floor. These are the smaller tables.",
    suggestions: ["Sofas", "Accent chairs", "Living room"],
  },
  {
    test: /chair|seating/,
    category: "accent-chairs",
    shop: { href: "/furniture/accent-chairs", label: "Shop accent chairs" },
    text: "The front legs of an accent chair should share the rug with the sofa. If only the back legs fit, the rug is too small.",
    suggestions: ["Sofas", "8×10 rugs", "Living room"],
  },
  {
    test: /sofa|couch|sectional/,
    category: "sofas",
    shop: { href: "/furniture/sofas", label: "Shop sofas" },
    text: "These sofas are scaled for an 8×10 rug. Measure the sofa in feet, then leave about 18 inches of rug in front of it.",
    suggestions: ["8×10 rugs", "Coffee tables", "Living room"],
  },
];

const styles = [
  { test: /oushak/, category: "oushak", href: "/rugs/oushak", label: "Shop Oushak rugs" },
  { test: /vintage|aged|faded/, category: "vintage", href: "/rugs/vintage", label: "Shop vintage rugs" },
  { test: /persian/, category: "persian-style", href: "/rugs/persian-style", label: "Shop Persian-style rugs" },
  { test: /washable|flatweave|kids|dog|pet/, category: "washable", href: "/rugs/washable", label: "Shop washable rugs" },
];

const colors = ["Ivory", "Blue", "Terracotta", "Sage", "Charcoal", "Apricot"];

function sizeFrom(message: string): string | undefined {
  const match = /(\d+)\s*(?:x|×|by)\s*(\d+)/i.exec(message);
  if (!match) return undefined;
  return `${match[1]}x${match[2]}`;
}

export function planGuide(message: string): GuidePlan {
  const text = message.trim().toLowerCase();

  if (!text || /^(hi|hello|hey|help|start)\b/.test(text)) {
    return {
      text: "Tell me the room and I’ll match a size, then show pieces we have in a U.S. warehouse. Rugs are sized in feet. Furniture is scaled to those rugs.",
      suggestions: ["Living room", "Bedroom", "Dining room", "Hallway", "Washable rugs", "Sofas"],
      filters: {},
    };
  }

  if (/clean|wash my|stain/.test(text)) {
    return {
      text: "Rug cleaning is priced after we see the piece. There is no fixed price on the site. Send a few photos and the size in feet.",
      suggestions: ["Rug repair", "Custom sizing", "Pickup and delivery"],
      shop: { href: "/services/rug-cleaning", label: "Request a cleaning quote" },
      filters: {},
    };
  }

  if (/repair|fringe|rewav/.test(text)) {
    return {
      text: "Repair, fringe, and reweaving are quoted from photos and the size of the damage.",
      suggestions: ["Rug cleaning", "Custom sizing"],
      shop: { href: "/services/rug-repair", label: "Request a repair quote" },
      filters: {},
    };
  }

  if (/custom size|cut|binding|serg/.test(text)) {
    return {
      text: "Custom sizing is cut and bound to the measurement you send. The price is a quote, not a list price.",
      suggestions: ["How do I measure?", "Rug cleaning"],
      shop: { href: "/services/custom-sizing", label: "Ask about custom sizing" },
      filters: {},
    };
  }

  if (/pickup|delivery of my rug|collect my/.test(text)) {
    return {
      text: "Pickup and delivery for care is quoted for your ZIP code. Rugs you buy ship free in the continental United States.",
      suggestions: ["Rug cleaning", "Shipping"],
      shop: { href: "/services/pickup-and-delivery", label: "Pickup and delivery" },
      filters: {},
    };
  }

  if (/shipping|deliver/.test(text)) {
    return {
      text: "Shipping is free in the continental United States. The product page names the warehouse and the handling time, in business days.",
      suggestions: ["Returns", "How do I measure?"],
      shop: { href: "/help/shipping", label: "Shipping details" },
      filters: {},
    };
  }

  if (/return/.test(text)) {
    return {
      text: "You have 100 days to return an unused piece in the condition it arrived.",
      suggestions: ["Shipping", "Living room"],
      shop: { href: "/help/returns", label: "Return policy" },
      filters: {},
    };
  }

  if (/measur/.test(text)) {
    return {
      text: "Measure the clear floor in feet and inches. Leave a border of bare floor at the walls. For a dining table, add about 2 feet on every side so chairs stay on the rug.",
      suggestions: ["Living room", "Bedroom", "Dining room"],
      shop: { href: "/guides/measure-for-a-rug", label: "Measuring guide" },
      filters: {},
    };
  }

  if (/sale|discount|markdown|deal|% off|off\b/.test(text)) {
    return {
      text: "These are priced below the list. The accent price is what you pay. The crossed-out price is the regular list for that size.",
      suggestions: ["Living room", "Sofas", "Washable rugs"],
      shop: { href: "/#sale", label: "See priced-below-list pieces" },
      filters: { type: "rug" },
      sale: true,
    };
  }

  const furn = furniture.find((item) => item.test.test(text));
  if (furn && !/rug/.test(text)) {
    return {
      text: furn.text,
      suggestions: furn.suggestions,
      shop: furn.shop,
      filters: { type: "furniture", category: furn.category },
    };
  }

  const style = styles.find((item) => item.test.test(text));
  const room = rooms.find((item) => item.test.test(text));
  const color = colors.find((name) => text.includes(name.toLowerCase()));
  const sizeLabel = sizeFrom(text) ?? room?.sizeLabel;
  const filters: ProductFilters = { type: "rug" };

  if (style) filters.category = style.category;
  else if (room && "filters" in room && room.filters) Object.assign(filters, room.filters);
  else if (room?.room) filters.room = room.room;
  if (color) filters.color = color;
  if (/washable|flatweave|pet|dog|kid/.test(text)) filters.category = "washable";

  if (style || room || color || sizeLabel || filters.category) {
    const lead = room?.text ?? (style ? `${style.label.replace("Shop ", "")} are in stock in a U.S. warehouse.` : "Here are pieces that match what you described.");
    const shop = sizeLabel
      ? { href: `/rugs/size/${sizeLabel}`, label: `Shop ${sizeLabel.replace("x", "×")} rugs` }
      : style
        ? { href: style.href, label: style.label }
        : color
          ? { href: `/rugs/color/${color.toLowerCase()}`, label: `Shop ${color.toLowerCase()} rugs` }
          : room?.shop;
    return {
      text: lead,
      suggestions: room?.suggestions ?? ["Living room", "Bedroom", "Sofas", "Washable rugs"],
      shop,
      filters,
      sizeLabel,
    };
  }

  if (/furniture/.test(text)) {
    return {
      text: "Furniture is scaled to the rug, not the other way around. Sofas and chairs in this collection are meant for an 8×10.",
      suggestions: ["Sofas", "Coffee tables", "Accent chairs", "Side tables"],
      shop: { href: "/furniture", label: "Shop furniture" },
      filters: { type: "furniture" },
    };
  }

  return {
    text: "I can narrow this by room, size, or whether it needs to be washable. Which room is the rug for?",
    suggestions: ["Living room", "Bedroom", "Dining room", "Hallway", "Washable rugs", "Sofas"],
    filters: { type: "rug" },
  };
}
