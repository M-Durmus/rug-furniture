type FurnitureKind = "sofa" | "table" | "chair" | "side";

type FurnitureArtProps = {
  colors: string[];
  kind?: FurnitureKind;
  className?: string;
  label: string;
};

export function FurnitureArt({ colors, kind = "sofa", className, label }: FurnitureArtProps) {
  const cloth = colors[0] ?? "#e6dfd2";
  const wood = colors[1] ?? "#8a7355";
  const ink = "#1d1a16";

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 200 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="260" fill="#ebe3d3" />
      {kind === "sofa" ? (
        <>
          <rect
            x="28"
            y="78"
            width="144"
            height="92"
            rx="2"
            fill={cloth}
            stroke={ink}
            strokeWidth="2"
          />
          <rect x="36" y="88" width="40" height="48" fill={wood} opacity="0.35" />
          <rect x="80" y="88" width="40" height="48" fill={wood} opacity="0.35" />
          <rect x="124" y="88" width="40" height="48" fill={wood} opacity="0.35" />
          <rect x="40" y="170" width="8" height="28" fill={wood} />
          <rect x="152" y="170" width="8" height="28" fill={wood} />
        </>
      ) : null}
      {kind === "table" ? (
        <>
          <rect x="36" y="108" width="128" height="18" fill={wood} stroke={ink} strokeWidth="2" />
          <rect x="52" y="126" width="8" height="48" fill={ink} />
          <rect x="140" y="126" width="8" height="48" fill={ink} />
        </>
      ) : null}
      {kind === "chair" ? (
        <>
          <rect
            x="70"
            y="70"
            width="60"
            height="72"
            rx="2"
            fill={cloth}
            stroke={ink}
            strokeWidth="2"
          />
          <rect x="64" y="142" width="72" height="16" fill={wood} stroke={ink} strokeWidth="2" />
          <rect x="72" y="158" width="6" height="36" fill={ink} />
          <rect x="122" y="158" width="6" height="36" fill={ink} />
        </>
      ) : null}
      {kind === "side" ? (
        <>
          <rect x="78" y="96" width="44" height="10" fill={wood} stroke={ink} strokeWidth="2" />
          <rect x="96" y="106" width="8" height="70" fill={ink} />
          <rect x="78" y="176" width="44" height="6" fill={wood} />
        </>
      ) : null}
    </svg>
  );
}

export type { FurnitureKind };
