import { getWarehouse, warehouses } from "@/lib/data/facets";
import type { City, Faq, Guide, Post, Product, Service } from "@/lib/data/types";
import { absoluteUrl, imageSize, site } from "@/lib/site";
import type {
  ArticleSchema,
  BreadcrumbListSchema,
  FaqPageSchema,
  HowToSchema,
  LocalServiceGraphSchema,
  ProductSchema,
  ServicePageSchema,
  SiteGraphSchema,
} from "@/lib/seo/types";
import { validateJsonLd } from "@/lib/seo/validate";

export type Crumb = { name: string; path: string };

const quoteDescription = "Priced by quote after we see the rug, the size in feet and inches, and the city.";

export function organizationAndWebsiteJsonLd(): SiteGraphSchema {
  const headquarters = getWarehouse("nj");
  return validateJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: "Wool & Loom",
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.phone,
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png"), width: imageSize.logo.width, height: imageSize.logo.height },
        address: {
          "@type": "PostalAddress",
          streetAddress: headquarters.street,
          addressLocality: headquarters.city,
          addressRegion: headquarters.region,
          postalCode: headquarters.postalCode,
          addressCountry: "US",
        },
        areaServed: { "@type": "Country", name: "United States" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
        department: warehouses.map((warehouse) => ({
          "@type": "Warehouse",
          name: `Wool & Loom ${warehouse.name}`,
          telephone: warehouse.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: warehouse.street,
            addressLocality: warehouse.city,
            addressRegion: warehouse.region,
            postalCode: warehouse.postalCode,
            addressCountry: "US",
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: "Wool & Loom",
        url: site.url,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": absoluteUrl("/#organization") },
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }) as SiteGraphSchema;
}

export function breadcrumbJsonLd(items: Crumb[]): BreadcrumbListSchema {
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }) as BreadcrumbListSchema;
}

export function productJsonLd(product: Product): ProductSchema {
  const url = absoluteUrl(product.href);
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: [absoluteUrl(product.image)],
    brand: { "@type": "Brand", name: "Wool & Loom" },
    category: product.kind === "rug" ? "Turkish rugs" : "Furniture",
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2027-10-28",
      seller: { "@type": "Organization", name: "Wool & Loom" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    review: product.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      name: review.title,
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.rating),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  }) as ProductSchema;
}

export function serviceJsonLd(service: Service): ServicePageSchema {
  const url = absoluteUrl(`/services/${service.slug}`);
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    image: absoluteUrl(service.image),
    areaServed: { "@type": "Country", name: "United States" },
    provider: { "@type": "Organization", name: "Wool & Loom", url: site.url },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      description: quoteDescription,
      seller: { "@type": "Organization", name: "Wool & Loom" },
    },
  }) as ServicePageSchema;
}

export function localServiceJsonLd(service: Service, city: City): LocalServiceGraphSchema {
  const warehouse = getWarehouse(city.warehouseId);
  const url = absoluteUrl(`/services/${service.slug}/${city.slug}`);
  return validateJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${service.name} in ${city.name}`,
        serviceType: service.serviceType,
        description: `${service.description} ${city.note}`,
        url,
        image: absoluteUrl(service.image),
        areaServed: { "@type": "City", name: `${city.name}, ${city.state}` },
        provider: { "@type": "Organization", name: "Wool & Loom", url: site.url },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          description: quoteDescription,
          seller: { "@type": "Organization", name: "Wool & Loom" },
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${url}#business`,
        name: `Wool & Loom ${service.name} in ${city.name}`,
        url,
        image: absoluteUrl(service.image),
        telephone: warehouse.phone,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: warehouse.street,
          addressLocality: warehouse.city,
          addressRegion: warehouse.region,
          postalCode: warehouse.postalCode,
          addressCountry: "US",
        },
        areaServed: { "@type": "City", name: city.name },
        parentOrganization: { "@type": "Organization", name: "Wool & Loom", url: site.url },
      },
    ],
  }) as LocalServiceGraphSchema;
}

export function faqJsonLd(items: Faq[]): FaqPageSchema {
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }) as FaqPageSchema;
}

export function articleJsonLd(post: Post): ArticleSchema {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "en-US",
    image: [absoluteUrl("/images/og.png")],
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Wool & Loom", url: site.url },
    publisher: {
      "@type": "Organization",
      name: "Wool & Loom",
      url: site.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    },
  }) as ArticleSchema;
}

export function howToJsonLd(guide: Guide): HowToSchema {
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return validateJsonLd({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    totalTime: guide.totalTime,
    image: [absoluteUrl("/images/og.png")],
    tool: guide.tools.map((name) => ({ "@type": "HowToTool", name })),
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`,
    })),
  }) as HowToSchema;
}
