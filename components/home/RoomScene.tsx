import Image from "next/image";

export function RoomScene() {
  return (
    <figure className="relative aspect-[16/10] overflow-hidden bg-sand">
      <Image
        src="/images/photos/living.webp"
        alt="Living room with a pale rug in front of a gray sofa"
        fill
        preload
        unoptimized
        fetchPriority="high"
        decoding="sync"
        loading="eager"
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
    </figure>
  );
}
