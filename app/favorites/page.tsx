import { FavoritesView } from "@/components/favorites/FavoritesView";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Favorites",
  description: "Rugs and furniture you saved in this browser. This page is not indexed.",
  path: "/favorites",
  index: false,
});

export default function FavoritesPage() {
  return (
    <Container className="py-10 pb-16">
      <h1 className="text-h1">Favorites</h1>
      <FavoritesView />
    </Container>
  );
}
