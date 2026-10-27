import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import slugs from "../data/slugs.json" with { type: "json" };

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const palettes = [
  ["#f4efe4", "#1e3a5f", "#8c3d2f", "#c4a574"],
  ["#1d3f66", "#f6f1e6", "#c45c3e", "#d4c4a8"],
  ["#f7f1e6", "#c4b49a", "#8d9a86", "#5c5346"],
  ["#8c3d2f", "#f3e6d4", "#1f1a17", "#d7a07a"],
  ["#5f6f5a", "#f3eee4", "#c4a574", "#2c2824"],
  ["#2a2826", "#d9d3c9", "#8a8175", "#f7f4ef"],
  ["#23415f", "#e7d7c3", "#a33b32", "#f4efe6"],
  ["#efe6d6", "#6e2e2a", "#d7c4a3", "#1f3b32"],
];

function hash(value) {
  let h = 2166136261;
  for (const char of value) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return h >>> 0;
}

function rgb(hex) {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}

function writePng(path, width, height, pixels) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 3 + 1);
    raw[row] = 0;
    pixels.copy(raw, row + 1, y * width * 3, (y + 1) * width * 3);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, png);
}

function fill(buf, width, x, y, w, h, color) {
  const [r, g, b] = color;
  const x0 = Math.max(0, x);
  const y0 = Math.max(0, y);
  const x1 = Math.min(width, x + w);
  const height = buf.length / 3 / width;
  const y1 = Math.min(height, y + h);
  for (let yy = y0; yy < y1; yy += 1) {
    let i = (yy * width + x0) * 3;
    for (let xx = x0; xx < x1; xx += 1) {
      buf[i] = r;
      buf[i + 1] = g;
      buf[i + 2] = b;
      i += 3;
    }
  }
}

function canvas(width, height, color) {
  const buf = Buffer.alloc(width * height * 3);
  fill(buf, width, 0, 0, width, height, color);
  return buf;
}

function rug(slug, width, height) {
  const n = hash(slug);
  const colors = palettes[n % palettes.length].map(rgb);
  const buf = canvas(width, height, colors[0]);
  const border = Math.round(width * 0.06);
  fill(buf, width, 0, 0, width, border, colors[1]);
  fill(buf, width, 0, height - border, width, border, colors[1]);
  fill(buf, width, 0, 0, border, height, colors[1]);
  fill(buf, width, width - border, 0, border, height, colors[1]);
  const inset = border + Math.round(width * 0.025);
  fill(buf, width, inset, inset, width - inset * 2, Math.max(4, Math.round(height * 0.012)), colors[2]);
  fill(buf, width, inset, height - inset, width - inset * 2, Math.max(4, Math.round(height * 0.012)), colors[2]);

  const pattern = n % 4;
  if (pattern === 0) {
    const medW = Math.round(width * 0.42);
    const medH = Math.round(height * 0.34);
    fill(buf, width, Math.round((width - medW) / 2), Math.round((height - medH) / 2), medW, medH, colors[1]);
    fill(buf, width, Math.round(width * 0.38), Math.round(height * 0.4), Math.round(width * 0.24), Math.round(height * 0.2), colors[2]);
  } else if (pattern === 1) {
    for (let band = 0; band < 5; band += 1) {
      const y = Math.round(height * (0.18 + band * 0.14));
      fill(buf, width, inset, y, width - inset * 2, Math.round(height * 0.045), band % 2 ? colors[2] : colors[1]);
    }
  } else if (pattern === 2) {
    const cell = Math.round(width * 0.16);
    for (let y = inset; y < height - inset; y += cell) {
      for (let x = inset; x < width - inset; x += cell) {
        fill(buf, width, x + 6, y + 6, cell - 18, cell - 18, (x + y) % (cell * 2) === 0 ? colors[1] : colors[3]);
      }
    }
  } else {
    for (let step = 8; step < height * 0.4; step += 10) {
      fill(buf, width, Math.round(width / 2 - step), Math.round(height / 2 - step * 0.7), step * 2, 6, step % 20 === 8 ? colors[1] : colors[2]);
    }
  }

  for (let y = inset; y < height - inset; y += 8) {
    fill(buf, width, inset, y, width - inset * 2, 1, colors[3]);
  }
  return buf;
}

function furniture(slug, width, height) {
  const n = hash(slug);
  const colors = palettes[(n + 3) % palettes.length].map(rgb);
  const buf = canvas(width, height, colors[0]);
  fill(buf, width, 0, Math.round(height * 0.62), width, Math.round(height * 0.38), colors[3]);
  fill(buf, width, Math.round(width * 0.12), Math.round(height * 0.48), Math.round(width * 0.76), Math.round(height * 0.28), colors[1]);
  fill(buf, width, Math.round(width * 0.18), Math.round(height * 0.18), Math.round(width * 0.28), Math.round(height * 0.22), colors[2]);
  fill(buf, width, Math.round(width * 0.56), Math.round(height * 0.7), Math.round(width * 0.22), Math.round(height * 0.08), colors[2]);
  return buf;
}

function logo(size) {
  const ink = rgb("#171513");
  const paper = rgb("#f3eee4");
  const buf = canvas(size, size, ink);
  const s = Math.round(size * 0.12);
  fill(buf, size, s, s, size - s * 2, s / 2, paper);
  fill(buf, size, s, s, s / 2, size - s * 2, paper);
  fill(buf, size, size - s - s / 2, s, s / 2, size - s * 2, paper);
  fill(buf, size, Math.round(size * 0.42), Math.round(size * 0.22), Math.round(size * 0.16), Math.round(size * 0.62), paper);
  return buf;
}

function og() {
  const width = 1200;
  const height = 630;
  const buf = rug("wool-and-loom-og", width, height);
  fill(buf, width, 0, height - 92, width, 92, rgb("#171513"));
  return buf;
}

const jobs = [
  ...slugs.rugs.map((slug) => ({
    path: join(root, "public", "images", "rugs", `${slug}.png`),
    width: 640,
    height: 800,
    paint: () => rug(slug, 640, 800),
  })),
  ...slugs.furniture.map((slug) => ({
    path: join(root, "public", "images", "furniture", `${slug}.png`),
    width: 640,
    height: 800,
    paint: () => furniture(slug, 640, 800),
  })),
  {
    path: join(root, "public", "images", "room.png"),
    width: 1200,
    height: 675,
    paint: () => furniture("living-room-preview", 1200, 675),
  },
  {
    path: join(root, "public", "images", "og.png"),
    width: 1200,
    height: 630,
    paint: () => og(),
  },
  {
    path: join(root, "public", "images", "logo.png"),
    width: 512,
    height: 512,
    paint: () => logo(512),
  },
];

for (const job of jobs) writePng(job.path, job.width, job.height, job.paint());
console.log(`Wrote ${jobs.length} images`);
