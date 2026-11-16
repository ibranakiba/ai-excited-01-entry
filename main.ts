// ai-excited-01 entry — "Three Head Dragon"
//
// The picture: a three-headed golden dragon bursting out of a framed
// museum painting, ice pouring from the left head, lightning from the
// middle, fire from the right, visitors recoiling below. The artwork
// itself is stored beside this file as base64 (image.b64); this
// program only unpacks it, proves it is the picture we entered, and
// puts it where the judge expects to find it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Once decoded, the picture is exactly this long. Pinning the length
// means a truncated file or a swapped payload can never silently
// become a different (or broken) entry.
const PICTURE_BYTES = 285179;

// Every JPEG opens with these three bytes.
const JPEG_OPENING = [0xff, 0xd8, 0xff];

function unpack(encodedText: string): Buffer {
  // Fail fast on an empty file, naming the file, instead of letting the
  // decoder hand back an empty buffer and failing further down.
  if (encodedText.trim().length === 0) {
    throw new Error("image.b64 is empty — nothing to decode");
  }
  const picture = Buffer.from(encodedText.trim(), "base64");
  if (picture.byteLength === 0) {
    throw new Error("image.b64 decoded to an empty buffer");
  }
  const opening = [picture[0], picture[1], picture[2]];
  const isJpeg = JPEG_OPENING.every((want, at) => opening[at] === want);
  if (!isJpeg) {
    const seen = opening
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ")
      .toUpperCase();
    throw new Error(
      `payload is not a JPEG (first bytes ${seen}, want FF D8 FF)`,
    );
  }
  if (picture.byteLength !== PICTURE_BYTES) {
    throw new Error(
      `payload is ${picture.byteLength} bytes, want exactly ${PICTURE_BYTES}`,
    );
  }
  // A JPEG closes with FF D9. If the tail is anything else the file was
  // cut short, or something got appended after the picture.
  const tail = [
    picture[picture.byteLength - 2],
    picture[picture.byteLength - 1],
  ];
  const isClosed = tail[0] === 0xff && tail[1] === 0xd9;
  if (!isClosed) {
    const seen = tail
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ")
      .toUpperCase();
    throw new Error(
      `payload is not a complete JPEG (last bytes ${seen}, want FF D9)`,
    );
  }
  return picture;
}

function run(): void {
  const folder = dirname(fileURLToPath(import.meta.url));
  const destination = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const picture = unpack(readFileSync(join(folder, "image.b64"), "utf8"));
  mkdirSync(destination, { recursive: true });
  const target = join(destination, "entry.png");
  writeFileSync(target, picture);
  console.log(`entry image ready: ${target} (${picture.byteLength} bytes)`);
}

run();
