export type SchemaContext = "https://schema.org";

export type BrandSchema = { "@type": "Brand"; name: "Wool & Loom" };

export type OrganizationRef = { "@type": "Organization"; name: "Wool & Loom"; url?: string };

export type ImageObjectSchema = { "@type": "ImageObject"; url: string; width?: number; height?: number };

export type PostalAddressSchema = {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "US";
};

export type OfferSchema = {
  "@type": "Offer";
  url: string;
  priceCurrency: "USD";
  price: string;
  availability: "https://schema.org/InStock" | "https://schema.org/OutOfStock";
  itemCondition: "https://schema.org/NewCondition";
  priceValidUntil: string;
  seller: { "@type": "Organization"; name: "Wool & Loom" };
};

export type QuoteOfferSchema = {
  "@type": "Offer";
  url: string;
  priceCurrency: "USD";
  availability: "https://schema.org/PreOrder";
  description: string;
  seller: { "@type": "Organization"; name: "Wool & Loom" };
};

export type AggregateRatingSchema = {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: number;
  bestRating: "5";
  worstRating: "1";
};

export type ReviewSchema = {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  datePublished: string;
  name: string;
  reviewBody: string;
  reviewRating: {
    "@type": "Rating";
    ratingValue: string;
    bestRating: "5";
    worstRating: "1";
  };
};

export type ProductSchema = {
  "@context": SchemaContext;
  "@type": "Product";
  name: string;
  description: string;
  sku: string;
  image: string[];
  brand: BrandSchema;
  category: string;
  url: string;
  offers: OfferSchema;
  aggregateRating: AggregateRatingSchema;
  review: ReviewSchema[];
};

export type SearchActionSchema = {
  "@type": "SearchAction";
  target: string;
  "query-input": "required name=search_term_string";
};

export type OrganizationSchema = {
  "@type": "Organization";
  "@id": string;
  name: "Wool & Loom";
  url: string;
  description: string;
  email: string;
  telephone: string;
  logo: ImageObjectSchema;
  address: PostalAddressSchema;
  areaServed: { "@type": "Country"; name: "United States" };
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: "customer service";
    areaServed: "US";
    availableLanguage: "English";
  };
  department: Array<{
    "@type": "Warehouse";
    name: string;
    address: PostalAddressSchema;
    telephone: string;
  }>;
};

export type WebSiteSchema = {
  "@type": "WebSite";
  "@id": string;
  name: "Wool & Loom";
  url: string;
  description: string;
  inLanguage: "en-US";
  publisher: { "@id": string };
  potentialAction: SearchActionSchema;
};

export type SiteGraphSchema = {
  "@context": SchemaContext;
  "@graph": [OrganizationSchema, WebSiteSchema];
};

export type BreadcrumbListSchema = {
  "@context": SchemaContext;
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type ServiceSchema = {
  "@type": "Service";
  "@id"?: string;
  name: string;
  serviceType: string;
  description: string;
  url: string;
  image: string;
  areaServed: { "@type": "Country" | "City"; name: string };
  provider: OrganizationRef;
  offers: QuoteOfferSchema;
};

export type LocalBusinessSchema = {
  "@type": "LocalBusiness";
  "@id"?: string;
  name: string;
  url: string;
  image: string;
  telephone: string;
  priceRange: "$$";
  address: PostalAddressSchema;
  areaServed: { "@type": "City"; name: string };
  parentOrganization: OrganizationRef;
};

export type ServicePageSchema = {
  "@context": SchemaContext;
  "@type": "Service";
  name: string;
  serviceType: string;
  description: string;
  url: string;
  image: string;
  areaServed: { "@type": "Country"; name: "United States" };
  provider: OrganizationRef;
  offers: QuoteOfferSchema;
};

export type LocalServiceGraphSchema = {
  "@context": SchemaContext;
  "@graph": [ServiceSchema, LocalBusinessSchema];
};

export type FaqPageSchema = {
  "@context": SchemaContext;
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
};

export type ArticleSchema = {
  "@context": SchemaContext;
  "@type": "Article";
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  inLanguage: "en-US";
  image: string[];
  mainEntityOfPage: string;
  author: { "@type": "Organization"; name: "Wool & Loom"; url: string };
  publisher: { "@type": "Organization"; name: "Wool & Loom"; url: string; logo: ImageObjectSchema };
};

export type HowToSchema = {
  "@context": SchemaContext;
  "@type": "HowTo";
  name: string;
  description: string;
  totalTime: string;
  image: string[];
  tool: Array<{ "@type": "HowToTool"; name: string }>;
  step: Array<{ "@type": "HowToStep"; position: number; name: string; text: string; url: string }>;
};

export type JsonLdSchema =
  | ProductSchema
  | SiteGraphSchema
  | BreadcrumbListSchema
  | ServicePageSchema
  | LocalServiceGraphSchema
  | FaqPageSchema
  | ArticleSchema
  | HowToSchema;
