import type { JsonLdSchema } from "@/lib/seo/types";

function requireKeys(value: object, keys: string[], label: string) {
  for (const key of keys) {
    if (!(key in value) || (value as Record<string, unknown>)[key] === undefined) {
      throw new Error(`${label} is missing ${key}`);
    }
  }
}

export function validateJsonLd(data: JsonLdSchema): JsonLdSchema {
  if ("@context" in data && data["@context"] !== "https://schema.org") {
    throw new Error("JSON-LD @context must be https://schema.org");
  }

  if ("@graph" in data) {
    const graph = data["@graph"];
    if (!Array.isArray(graph)) throw new Error("JSON-LD @graph is empty");
    for (const node of graph) requireKeys(node, ["@type"], "graph node");
    return data;
  }

  if (!("@type" in data)) throw new Error("JSON-LD node is missing @type");

  switch (data["@type"]) {
    case "Product":
      requireKeys(data, ["name", "sku", "image", "offers", "aggregateRating", "review"], "Product");
      requireKeys(data.offers, ["@type", "price", "priceCurrency", "availability", "url"], "Offer");
      if (data.offers["@type"] !== "Offer") throw new Error("Product.offers must be an Offer");
      requireKeys(data.aggregateRating, ["ratingValue", "reviewCount"], "AggregateRating");
      if (data.aggregateRating["@type"] !== "AggregateRating") throw new Error("AggregateRating @type");
      if (data.review.length === 0 || data.review.some((review) => review["@type"] !== "Review")) {
        throw new Error("Product.review must contain Review nodes");
      }
      break;
    case "Service":
      requireKeys(data, ["name", "serviceType", "description", "url", "provider", "offers"], "Service");
      if (data.offers["@type"] !== "Offer") throw new Error("Service.offers must be an Offer");
      break;
    case "FAQPage":
      requireKeys(data, ["mainEntity"], "FAQPage");
      if (data.mainEntity.length === 0) throw new Error("FAQPage has no questions");
      for (const question of data.mainEntity) {
        if (question["@type"] !== "Question" || question.acceptedAnswer["@type"] !== "Answer") {
          throw new Error("FAQPage questions must use Question and Answer");
        }
      }
      break;
    case "Article":
      requireKeys(data, ["headline", "datePublished", "author", "image", "mainEntityOfPage"], "Article");
      break;
    case "HowTo":
      requireKeys(data, ["name", "step"], "HowTo");
      if (data.step.length === 0 || data.step.some((step) => step["@type"] !== "HowToStep")) {
        throw new Error("HowTo steps must use HowToStep");
      }
      break;
    case "BreadcrumbList":
      requireKeys(data, ["itemListElement"], "BreadcrumbList");
      if (data.itemListElement.some((item) => item["@type"] !== "ListItem" || !item.item)) {
        throw new Error("BreadcrumbList items must be ListItem nodes with item URLs");
      }
      break;
    default:
      break;
  }

  return data;
}
