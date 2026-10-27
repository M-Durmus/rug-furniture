import { Container } from "@/components/ui/Container";

const points = [
  "Free shipping across USA",
  "100-day returns",
  "Our own stock / 4 U.S. warehouses",
  "Rug care services",
  "Turkish rug experts since 1998",
];

export function TrustBar() {
  return (
    <div className="border-b border-line bg-sand">
      <Container>
        <ul className="flex h-12 items-center gap-8 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {points.map((point) => (
            <li key={point} className="shrink-0">
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
