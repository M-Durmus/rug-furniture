import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function ServiceHero({
  eyebrow,
  title,
  lede,
  href,
  image,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  href: string;
  image?: string;
}) {
  return (
    <header className="mt-8 grid items-center gap-8 lg:grid-cols-2">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 font-serif text-h1">{title}</h1>
        <p className="mt-4 max-w-xl text-lg leading-8">{lede}</p>
        <div className="mt-6">
          <Button href={href}>Request a quote</Button>
        </div>
      </div>
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}
    </header>
  );
}
