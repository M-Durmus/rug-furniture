type RugArtProps = {
  colors: string[];
  style?: string;
  className?: string;
  label: string;
};

function patternOf(style?: string): "stripe" | "grid" | "field" | "medallion" {
  const value = (style ?? "").toLowerCase();
  if (value.includes("stripe")) return "stripe";
  if (value.includes("grid") || value.includes("check")) return "grid";
  if (value.includes("field") || value.includes("solid") || value.includes("kilim")) return "field";
  return "medallion";
}

export function RugArt({ colors, style, className, label }: RugArtProps) {
  const ground = colors[0] ?? "#c4b49a";
  const motif = colors[1] ?? "#8a7355";
  const ink = colors[2] ?? "#3e342c";
  const pattern = patternOf(style);

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 200 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="260" fill={ground} />
      <rect x="10" y="10" width="180" height="240" fill="none" stroke={ink} strokeWidth="6" />
      <rect x="18" y="18" width="164" height="224" fill="none" stroke={motif} strokeWidth="2" />
      {pattern === "stripe"
        ? [40, 70, 100, 130, 160].map((y) => (
            <rect key={y} x="28" y={y} width="144" height="10" fill={motif} opacity="0.85" />
          ))
        : null}
      {pattern === "grid" ? (
        <>
          {[48, 88, 128, 168, 208].map((y) => (
            <line key={`h-${y}`} x1="28" y1={y} x2="172" y2={y} stroke={ink} strokeWidth="1.5" />
          ))}
          {[52, 82, 112, 142].map((x) => (
            <line key={`v-${x}`} x1={x} y1="28" x2={x} y2="232" stroke={ink} strokeWidth="1.5" />
          ))}
        </>
      ) : null}
      {pattern === "field" ? (
        <rect x="36" y="36" width="128" height="188" fill={motif} opacity="0.18" />
      ) : null}
      {pattern === "medallion" ? (
        <>
          <ellipse cx="100" cy="130" rx="36" ry="48" fill="none" stroke={motif} strokeWidth="8" />
          <ellipse cx="100" cy="130" rx="16" ry="22" fill={ink} opacity="0.85" />
          <path d="M36 48 H164 M36 212 H164" stroke={motif} strokeWidth="3" />
        </>
      ) : null}
    </svg>
  );
}
