"use client";

import { FramedImage } from "@/components/media/FramedImage";
import { Modal } from "@/components/ui/Modal";
import { imageSize, imageSizes } from "@/lib/site";

export default function RoomPreview({
  name,
  image,
  alt,
  onClose,
}: {
  name: string;
  image: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <Modal title={`${name} in a room`} onClose={onClose}>
      <div className="relative bg-background" style={{ aspectRatio: "16 / 9" }}>
        <FramedImage
          src="/images/room.png"
          alt=""
          width={imageSize.room.width}
          height={imageSize.room.height}
          sizes={imageSizes.room}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-[14%] left-[18%] right-[18%] top-[42%]">
          <FramedImage src={image} alt={alt} width={640} height={800} sizes="40vw" className="h-full w-full object-cover" />
        </div>
      </div>
      <p className="mt-4 text-sm">A scale preview only. The rug pattern is placed on a living-room floor so you can judge the drawing, not the exact pile height.</p>
    </Modal>
  );
}
