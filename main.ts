// Three-Headed Golden Dragon Bursting from the Painting — ai-excited-01
// Writes the entry image (a three-headed golden dragon bursting out of
// a museum painting — one head breathing fire, one pouring liquid gold,
// one breathing ice, while visitors recoil in fear) from the bundled
// base64 file to $MAKEFUN_OUTPUT_DIR/entry.png.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

const EXPECTED_BYTES = 282839;

// The first three bytes of every JPEG file: 0xFF 0xD8 0xFF (SOI marker
// followed by the start of the next marker). We check them explicitly so
// a truncated or non-JPEG payload fails loudly instead of writing a
// corrupt image that the judge would reject.
const JPEG_MAGIC = [0xff, 0xd8, 0xff] as const;

function decodeImage(encoded: string): Buffer {
  const bytes = Buffer.from(encoded.trim(), "base64");
  if (bytes.length === 0) {
    throw new Error("image.b64 decoded to zero bytes");
  }
  const magicOk = JPEG_MAGIC.every((b, i) => bytes[i] === b);
  if (!magicOk) {
    const got = [...bytes.subarray(0, 3)]
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join(" ");
    throw new Error(
      `decoded bytes are not a JPEG: expected magic FF D8 FF, got ${got}`,
    );
  }
  if (bytes.length !== EXPECTED_BYTES) {
    throw new Error(`unexpected image size: ${bytes.length} bytes, expected ${EXPECTED_BYTES}`);
  }
  return bytes;
}

const encoded = readFileSync(join(here, "image.b64"), "utf8");
const bytes = decodeImage(encoded);

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(outPath, bytes);
console.log(`wrote ${outPath} (${bytes.length} bytes)`);
