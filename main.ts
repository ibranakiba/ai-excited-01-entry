// Colossal Whale over the Coastal City — ai-excited-01
// Writes the entry image (a colossal whale over a coastal city)
// from the bundled base64 file to $MAKEFUN_OUTPUT_DIR/entry.png.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

const EXPECTED_BYTES = 249119;

function decodeImage(encoded: string): Buffer {
  const bytes = Buffer.from(encoded.trim(), "base64");
  if (bytes.length === 0) {
    throw new Error("image.b64 decoded to zero bytes");
  }
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    throw new Error("decoded bytes are not a JPEG (missing FF D8 FF magic)");
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
