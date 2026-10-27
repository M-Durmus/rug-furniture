import type { JsonLdSchema } from "@/lib/seo/types";

export function JsonLd({ data }: { data: JsonLdSchema | JsonLdSchema[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
}
