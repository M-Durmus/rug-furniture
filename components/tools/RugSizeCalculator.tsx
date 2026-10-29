"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ROOM_BORDERS, recommendRugSize, type RoomKind } from "@/lib/tools/rug-size";

const rooms: { id: RoomKind; label: string }[] = [
  { id: "living", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining room" },
];

export function RugSizeCalculator() {
  const [room, setRoom] = useState<RoomKind>("living");
  const [width, setWidth] = useState("14");
  const [length, setLength] = useState("18");

  const widthNum = Number(width);
  const lengthNum = Number(length);
  const widthError =
    !Number.isFinite(widthNum) || widthNum < 4 || widthNum > 40
      ? "Enter a width from 4 to 40 feet."
      : "";
  const lengthError =
    !Number.isFinite(lengthNum) || lengthNum < 4 || lengthNum > 40
      ? "Enter a length from 4 to 40 feet."
      : "";
  const border = ROOM_BORDERS[room];
  const match = widthError || lengthError ? null : recommendRugSize(room, widthNum, lengthNum);

  const diagram = useMemo(() => {
    if (widthError || lengthError) return null;
    return { roomWidth: widthNum, roomLength: lengthNum, rug: match };
  }, [widthError, lengthError, widthNum, lengthNum, match]);

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block text-sm" htmlFor="room-type">
          Room type
          <Select
            id="room-type"
            className="mt-1"
            value={room}
            onChange={(event) => setRoom(event.target.value as RoomKind)}
          >
            {rooms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </Select>
        </label>
        <p className="text-sm text-mute">
          This room keeps {border} ft of bare floor on each side. The suggestion is the largest
          stock size that still fits inside that border.
        </p>
        <label className="block text-sm" htmlFor="room-width">
          Width in feet
          <Input
            id="room-width"
            className="mt-1"
            inputMode="decimal"
            value={width}
            aria-invalid={!!widthError}
            aria-describedby={widthError ? "room-width-error" : undefined}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>
        {widthError ? (
          <p id="room-width-error" role="alert" className="text-sm text-accent">
            {widthError}
          </p>
        ) : null}
        <label className="block text-sm" htmlFor="room-length">
          Length in feet
          <Input
            id="room-length"
            className="mt-1"
            inputMode="decimal"
            value={length}
            aria-invalid={!!lengthError}
            aria-describedby={lengthError ? "room-length-error" : undefined}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>
        {lengthError ? (
          <p id="room-length-error" role="alert" className="text-sm text-accent">
            {lengthError}
          </p>
        ) : null}
        {match ? (
          <div>
            <p>
              Use a <span className="font-medium">{match.label}</span> rug.
            </p>
            <Button href={match.href} className="mt-4">
              Shop {match.label} rugs
            </Button>
          </div>
        ) : (
          <p>
            {widthError || lengthError
              ? "Fix the measurements to see a size."
              : "No stock size leaves that border. A custom cut is quoted separately."}
          </p>
        )}
      </form>
      {diagram ? (
        <RoomDiagram
          room={room}
          roomWidth={diagram.roomWidth}
          roomLength={diagram.roomLength}
          rugWidth={diagram.rug?.width}
          rugLength={diagram.rug?.length}
        />
      ) : null}
    </div>
  );
}

function RoomDiagram({
  room,
  roomWidth,
  roomLength,
  rugWidth,
  rugLength,
}: {
  room: RoomKind;
  roomWidth: number;
  roomLength: number;
  rugWidth?: number;
  rugLength?: number;
}) {
  const pad = 16;
  const max = 280;
  const scale = max / Math.max(roomWidth, roomLength);
  const rw = roomWidth * scale;
  const rl = roomLength * scale;
  const rug = rugWidth && rugLength ? { w: rugWidth * scale, l: rugLength * scale } : null;
  const label = rooms.find((item) => item.id === room)?.label ?? "Room";

  return (
    <figure>
      <svg
        role="img"
        aria-labelledby="size-diagram-title size-diagram-desc"
        viewBox={`0 0 ${rw + pad * 2} ${rl + pad * 2}`}
        className="h-auto w-full max-w-md border border-line bg-sand"
      >
        <title id="size-diagram-title">
          Top view of the {label.toLowerCase()} and the suggested rug
        </title>
        <desc id="size-diagram-desc">
          The room is {roomWidth} by {roomLength} feet.
          {rug
            ? ` The rug is ${rugWidth} by ${rugLength} feet, centered with bare floor around it.`
            : " No stock rug fits inside the border."}
        </desc>
        <rect
          x={pad}
          y={pad}
          width={rw}
          height={rl}
          fill="var(--color-bg, #f6f1e8)"
          stroke="currentColor"
        />
        {rug ? (
          <rect
            x={pad + (rw - rug.w) / 2}
            y={pad + (rl - rug.l) / 2}
            width={rug.w}
            height={rug.l}
            fill="currentColor"
            opacity="0.18"
            stroke="currentColor"
          />
        ) : null}
      </svg>
      <figcaption className="mt-2 text-sm text-mute">
        Top view. The pale field is the room. The darker rectangle is the rug, centered so the
        border stays even.
      </figcaption>
    </figure>
  );
}
