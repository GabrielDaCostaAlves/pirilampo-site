// Otimiza os prints e injeta como data URIs no template da proposta.
// Uso: node scripts/build-proposta.mjs
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const shots = path.join(root, "shots");

const keys = [
  "home", "sobre", "segmentos", "projetos", "galeria", "momentos",
  "contato", "adminlogin", "admin_dashboard", "admin_posts",
  "admin_galeria", "admin_config", "admin_novo",
];

async function toDataUri(key) {
  const buf = await sharp(path.join(shots, `${key}.png`))
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

const map = {};
for (const k of keys) {
  map[k] = await toDataUri(k);
  console.log(`✓ ${k} (${Math.round(map[k].length / 1024)} KB base64)`);
}

let html = await readFile(path.join(root, "proposta-template.html"), "utf8");
html = html.replace(/\{\{img:([a-z_]+)\}\}/g, (_, k) => {
  if (!map[k]) throw new Error(`Imagem não encontrada: ${k}`);
  return map[k];
});

const out = path.join(root, "proposta-comercial.html");
await writeFile(out, html, "utf8");
console.log(`\n✅ Gerado: ${out} (${Math.round(html.length / 1024)} KB)`);
