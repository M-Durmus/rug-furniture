import { Button } from "@/components/ui/Button";

export function ServiceHero({
  eyebrow,
  title,
  lede,
  href,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  href: string;
}) {
  return (
    <header className="mt-6 max-w-3xl">
      {eyebrow ? <p className="text-sm text-mute">{eyebrow}</p> : null}
      <h1 className="font-serif text-h1">{title}</h1>
      <p className="mt-4 text-lg leading-8">{lede}</p>
      <div className="mt-6">
        <Button href={href}>Request a quote</Button>
      </div>
    </header>
  );
}
