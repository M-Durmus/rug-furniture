import Image from "next/image";

export function RoomScene() {
  return (
    <Image
      src="/images/photos/living.webp"
      alt="Living room with a pale rug in front of a gray sofa"
      fill
      preload
      unoptimized
      fetchPriority="high"
      decoding="sync"
      loading="eager"
      sizes="100vw"
      className="object-cover object-[center_72%]"
    />
  );
}
