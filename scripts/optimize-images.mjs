import sharp from 'sharp';
import { readdirSync, statSync, renameSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';

const ASSETS = join(process.cwd(), 'public', 'assets');
const BACKUP = join(process.cwd(), 'raw-assets-backup');
const EXT = new Set(['.jpg', '.jpeg', '.png', '.jpeg', '.JPG', '.JPEG', '.PNG']);

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXT.has(extname(e))) out.push(p);
  }
  return out;
}

const files = walk(ASSETS);
let ok = 0;
const failed = [];
for (const f of files) {
  const out = f.replace(/\.(jpe?g|png|JPE?G|PNG)$/, '.webp');
  try {
    await sharp(f, { failOn: 'none' })
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(out);
    ok++;
  } catch (err) {
    failed.push(`${f}: ${err.message}`);
  }
}
console.log(`Converted ${ok}/${files.length}, failed ${failed.length}`);
if (failed.length) console.log(failed.join('\n'));

if (failed.length === 0) {
  // Move originals to a backup dir so public/ only serves WebP.
  for (const f of files) {
    const rel = f.slice(ASSETS.length + 1);
    const dest = join(BACKUP, rel);
    mkdirSync(dirname(dest), { recursive: true });
    renameSync(f, dest);
  }
  console.log('Originals moved to raw-assets-backup/');
}
