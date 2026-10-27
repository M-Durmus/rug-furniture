import { spawn } from "node:child_process";

const port = 4173;
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", String(port)], {
  stdio: ["ignore", "pipe", "pipe"],
});

let buffer = "";
let warmed = false;

function pipe(chunk, stream) {
  const text = chunk.toString();
  if (!warmed) {
    buffer += text;
    if (buffer.includes("Ready")) {
      warmed = true;
      warm()
        .then(() => {
          process.stdout.write("Server warmed\n");
        })
        .catch((error) => {
          console.error(error);
          child.kill();
          process.exit(1);
        });
    }
    return;
  }
  stream.write(text);
}

child.stdout.on("data", (chunk) => pipe(chunk, process.stdout));
child.stderr.on("data", (chunk) => pipe(chunk, process.stderr));
child.on("exit", (code) => process.exit(code ?? 0));

async function warm() {
  const pages = ["/", "/rugs", "/rugs/sivas-medallion", "/services/rug-cleaning"];
  for (const path of pages) {
    const response = await fetch(`${origin}${path}`);
    const html = await response.text();
    const urls = new Set([...html.matchAll(/\/_next\/image\?[^"'\s]+/g)].map((match) => match[0].replaceAll("&amp;", "&")));
    await Promise.all(
      [...urls].map((url) =>
        fetch(`${origin}${url}`, { headers: { Accept: "image/avif,image/webp,image/apng,image/*,*/*" } }),
      ),
    );
  }
}
