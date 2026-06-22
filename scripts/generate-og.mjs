// Gera a imagem de compartilhamento (Open Graph) 1200x630 a partir da marca.
// Rode com: node scripts/generate-og.mjs
// Saída: src/app/opengraph-image.png (convenção de arquivo do Next.js).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const LOGO = 430;

const bg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="58%" stop-color="#f6f7f9"/>
      <stop offset="100%" stop-color="#eef4fb"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="1060" cy="70"  r="230" fill="#ffd45e" fill-opacity="0.26"/>
  <circle cx="130"  cy="580" r="250" fill="#6eb7e8" fill-opacity="0.20"/>
  <circle cx="210"  cy="120" r="120" fill="#f8a3c5" fill-opacity="0.18"/>
</svg>`;

const circleMask = Buffer.from(
  `<svg width="${LOGO}" height="${LOGO}" xmlns="http://www.w3.org/2000/svg"><circle cx="${LOGO / 2}" cy="${LOGO / 2}" r="${LOGO / 2}" fill="#fff"/></svg>`,
);

const logoRound = await sharp(join(root, "public/logopirilampo.png"))
  .resize(LOGO, LOGO, { fit: "cover" })
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(Buffer.from(bg))
  .composite([
    {
      input: logoRound,
      top: Math.round((H - LOGO) / 2),
      left: Math.round((W - LOGO) / 2),
    },
  ])
  .png()
  .toFile(join(root, "src/app/opengraph-image.png"));

console.log("OK -> src/app/opengraph-image.png");
