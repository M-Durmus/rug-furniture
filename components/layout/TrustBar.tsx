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
    <div className="border-b border-line bg-card">
      <Container className="px-0 sm:px-5">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {points.map((point) => (
            <li
              key={point}
              className="flex min-h-14 items-center justify-center border border-line bg-card px-3 py-3 text-center text-[13px] leading-5"
            >
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
