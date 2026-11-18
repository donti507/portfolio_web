import { mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, extname, join, relative, sep } from 'node:path';
import sharp from 'sharp';

const originals = 'photos/originals';
const output = 'public/photos';
const manifest = 'src/data/photos.json';
const categories = new Set(['wroclaw', 'science-events', 'nature', 'travel', 'life']);
const supported = /\.(avif|bmp|dng|gif|heic|heif|jpeg|jpg|jxl|png|tiff?|webp)$/i;
const generated = /-(800|1600)\.webp$/;

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  return (await Promise.all(entries.map(async entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return files(path);
    return entry.isFile() && supported.test(entry.name) ? [path] : [];
  }))).flat();
}

const existing = JSON.parse(await readFile(manifest, 'utf8'));
const previous = new Map(existing.map(photo => [photo.src1600, photo]));
const sources = (await files(originals)).sort();
await mkdir(output, { recursive: true });
const staging = await mkdtemp('public/.photos-build-');
const photos = [];
const paths = new Set();
try {
  for (const source of sources) {
    const category = relative(originals, source).split(sep)[0];
    if (!categories.has(category)) throw new Error(`Unknown photo category: ${source}`);
    const name = basename(source, extname(source));
    const slug = category + '-' + name.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const src800 = `photos/${slug}-800.webp`;
    const src1600 = `photos/${slug}-1600.webp`;
    if (paths.has(src1600)) throw new Error(`Duplicate photo slug: ${source}`);
    paths.add(src1600);
    paths.add(src800);
    try {
      const image = sharp(source, { failOn: 'warning' }).autoOrient();
      const [, large, preview] = await Promise.all([
        image.clone().resize({ width: 800 }).webp({ quality: 80 }).toFile(join(staging, basename(src800))),
        image.clone().resize({ width: 1600 }).webp({ quality: 80 }).toFile(join(staging, basename(src1600))),
        image.clone().resize({ width: 24 }).blur(0.7).webp({ quality: 50 }).toBuffer(),
      ]);
      const old = previous.get(src1600);
      const alt = old?.alt ?? '[add alt text]';
      if (alt === '[add alt text]') console.warn(`Add photo alt text: ${source}`);
      photos.push({
        src800, src1600, width: large.width, height: large.height,
        placeholder: 'data:image/webp;base64,' + preview.toString('base64'), category,
        title: old?.title ?? name.replace(/[-_]+/g, ' '),
        caption: old?.caption ?? '', alt, date: old?.date ?? '', featured: old?.featured ?? false,
      });
    } catch (error) {
      throw new Error(`Could not process photo ${source}`, { cause: error });
    }
  }
  for (const path of paths) await rename(join(staging, basename(path)), join('public', path));
  for (const entry of await readdir(output, { withFileTypes: true })) {
    if (entry.isFile() && generated.test(entry.name) && !paths.has('photos/' + entry.name)) {
      await rm(join(output, entry.name));
    }
  }
  const next = JSON.stringify(photos, null, 2) + '\n';
  if (next !== JSON.stringify(existing, null, 2) + '\n') await writeFile(manifest, next);
} finally {
  await rm(staging, { recursive: true, force: true });
}
