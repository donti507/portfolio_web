import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import sharp from 'sharp';

const output = fileURLToPath(new URL('../dist/', import.meta.url));

async function readData(path) {
  const original = await readFile(new URL(path, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(original, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  });
  return import('data:text/javascript;base64,' + Buffer.from(compiled.outputText).toString('base64'));
}

const [{ projects }, { experience }] = await Promise.all([
  readData('../src/data/projects.ts'),
  readData('../src/data/site.ts'),
]);

const prohibited = new Set([
  'Nowak', 'Connectomics & NeuroAI Group', '2504.09112', 'ISRC Paper #', 'hpo-scale-0844',
  'zenodo.10842911', 'CK-0411', 'uni-wroc.pl', '99.82', 'cryptographic session',
  '0009-0000-0000-0000', 'example.edu', 'Fall 2025', 'Distributed Checkpointing',
  'Neural Vector Field', 'doctoral tenure', 'Telemetry Normal', '918239', 'Lustre',
  '[to fill]', 'UK Biobank', 'ALAN-NeuroNet', '47K', 'In Press', 'IN PRESS', 'Pan-Cancer',
  'RICA', '577 758 192',
  '24,000', 'World Aquatics', 'Hanavan', 'Diving48', 'PINN',
  'Physics-Informed Neural Network', 'Wilson-Cowan', '20,000 angular', 'PSD surface',
  '1.8°', '32% more', 'ASHA', 'WAL', 'Polars', 'Appainer', 'Apptainer', 'ghcr.io',
  'RFC 5545', 'CalDAV', 'AES-256', 'TxID', 'Determinism Score', '#CK-', 'ARCH-LOG',
  'Monte Carlo', 'p < 0.001', 'Hugging Face Trial', 'carbon', 'Oct 2024 – May 2025',
  'Sep 2024 – Sep 2026', 'Jan 2024 – Nov 2024', 'May 2024 – Oct 2024',
  'Gaussian Processes', 'neuroglancer', 'NetworkX', 'JAX',
  ...projects.filter(entry => entry.verify).flatMap(entry => [entry.title, entry.shortTitle, entry.slug]),
  ...experience.filter(entry => entry.verify).map(entry => entry.role),
]);

const publicPhotos = fileURLToPath(new URL('../public/photos/', import.meta.url));
const music = JSON.parse(await readFile(new URL('../src/data/music.json', import.meta.url), 'utf8'));
const licenses = new Set(['own', 'CC0', 'CC-BY-4.0', 'Pixabay Content License']);
const fields = ['src', 'title', 'artist', 'license', 'source'];

function isWebSource(value) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}

let count = 0;
const failures = [];
async function checkPhotos(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await checkPhotos(path);
    else if (entry.isFile() || entry.isSymbolicLink()) {
      try {
        const metadata = await sharp(path).metadata();
        if (metadata.exif?.length || metadata.xmp?.length || metadata.iptc?.length) {
          failures.push(`${relative(publicPhotos, path)}: photo contains metadata that can include EXIF or GPS`);
        }
      } catch {
        failures.push(`${relative(publicPhotos, path)}: could not inspect photo metadata`);
      }
    }
  }
}

function checkMusic() {
  if (!Array.isArray(music)) { failures.push('music.json must contain an array'); return; }
  for (const [index, track] of music.entries()) {
    const label = `music.json track ${index + 1}`;
    if (!track || fields.some(field => typeof track[field] !== 'string' || !track[field].trim())) {
      failures.push(`${label}: all five metadata fields are required (including artist and source for CC BY 4.0)`);
      continue;
    }
    if (!licenses.has(track.license)) failures.push(`${label}: unsupported license`);
    if (!/^music\/[^/\\]+\.mp3$/i.test(track.src)) failures.push(`${label}: src must point to an MP3 under music/`);
    if (!isWebSource(track.source) && !(track.license === 'own' && track.source === 'own recording')) {
      failures.push(`${label}: source must be an HTTP(S) URL or own recording for an owned track`);
    }
  }
}

async function scan(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    const builtPath = relative(output, path).replaceAll('\\', '/');
    if (builtPath === 'photos/originals') {
      failures.push('photos/originals was copied to dist');
      continue;
    }
    if (entry.isDirectory()) {
      await scan(path);
    } else if (entry.isFile()) {
      const contents = await readFile(path);
      if (entry.name === 'index.html' || contents.length) count++;
      // Generated media is binary. Match forbidden text in the rest of the build.
      if (/^(photos\/.*\.webp|music\/.*\.mp3)$/i.test(builtPath)) continue;
      for (const value of prohibited) {
        if (contents.includes(value)) failures.push(`${relative(output, path)}: ${value}`);
      }
    }
  }
}

checkMusic();
await checkPhotos(publicPhotos);
await scan(output);
if (failures.length || !count) {
  console.error(failures.join('\n') || 'Content guard found no build output.');
  process.exitCode = 1;
} else {
  console.log(`Content guard passed: ${count} built files scanned, ${prohibited.size} prohibited strings checked.`);
}
