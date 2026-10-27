"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import type { Warehouse, WarehouseName } from "@/types";

const pins: Record<WarehouseName, { x: number; y: number }> = {
  California: { x: 120, y: 250 },
  Texas: { x: 430, y: 360 },
  Georgia: { x: 680, y: 340 },
  "New Jersey": { x: 820, y: 190 },
};

export function WarehouseMap({ warehouses }: { warehouses: Warehouse[] }) {
  const [name, setName] = useState<WarehouseName>(warehouses[0]?.name ?? "New Jersey");
  const current = warehouses.find((warehouse) => warehouse.name === name) ?? warehouses[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
      <svg viewBox="0 0 960 520" role="img" aria-label="Four Wool & Loom warehouses across the United States" className="h-auto w-full text-ink">
        <path
          d="M150 90 L250 70 L360 110 L470 80 L590 120 L700 100 L820 150 L880 230 L850 310 L790 350 L820 430 L700 470 L560 440 L470 480 L360 450 L250 470 L170 400 L110 300 L130 180 Z"
          fill="currentColor"
          opacity="0.08"
          stroke="currentColor"
          strokeWidth="2"
        />
        {warehouses.map((warehouse) => {
          const pin = pins[warehouse.name];
          const selected = warehouse.name === current?.name;
          return (
            <g key={warehouse.name}>
              <circle cx={pin.x} cy={pin.y} r={selected ? 10 : 7} fill={selected ? "var(--accent)" : "currentColor"} />
              <text x={pin.x + 16} y={pin.y + 4} fill="currentColor" fontSize="16">
                {warehouse.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div>
        <label className="block text-sm">
          Warehouse
          <Select className="mt-1" value={current?.name ?? ""} onChange={(event) => setName(event.target.value as WarehouseName)}>
            {warehouses.map((warehouse) => (
              <option key={warehouse.name} value={warehouse.name}>
                {warehouse.name}
              </option>
            ))}
          </Select>
        </label>
        {current ? (
          <p className="mt-4">
            {current.rugCount} rugs in {current.state}. Delivery in {current.deliveryDays} days.
          </p>
        ) : null}
      </div>
    </div>
  );
}
