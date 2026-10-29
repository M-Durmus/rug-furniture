import { permanentRedirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Trade program",
  description:
    "Wool & Loom trade terms for designers and retailers. The application lives on the trade program page.",
  path: "/trade-program",
});

export default function TradePage() {
  permanentRedirect("/trade-program");
}
