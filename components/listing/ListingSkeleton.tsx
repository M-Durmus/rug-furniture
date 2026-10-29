import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export function ListingSkeleton() {
  return (
    <Container className="py-8">
      <p className="sr-only">Loading products</p>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-4 h-14 w-2/3 max-w-md" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl" />
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index}>
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="mt-3 h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </li>
        ))}
      </ul>
    </Container>
  );
}
