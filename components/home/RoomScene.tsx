import Image from "next/image";
import { RugArt } from "@/components/media/RugArt";
export function RoomScene() {
  return (
    <figure className="relative aspect-[16/10] overflow-hidden bg-sand">
      <Image
        src="/images/room.png"
        alt="Living room with a pale Turkish rug in front of a low sofa"
        fill
        preload
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute bottom-[6%] left-[14%] w-[42%] max-w-56">
        <RugArt
          label=""
          style="oushak"
          colors={["#e7dccb", "#c4896a", "#6f675b"]}
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
