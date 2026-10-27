import { DesignShowcase } from "@/app/design/showcase";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Design system",
  description: "Wool & Loom color tokens, type, and interface components for review.",
  path: "/design",
  index: false,
});

export default function DesignPage() {
  return <DesignShowcase />;
}
