import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const repoDir = dirname(fileURLToPath(import.meta.url));
const encoded = await readFile(join(repoDir, 'image.b64'), 'utf8');
const image = Buffer.from(encoded.trim(), 'base64');
const destination = join(outputDir, 'entry.png');

await mkdir(outputDir, { recursive: true });
await writeFile(destination, image);
