import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

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
  ...projects.filter(entry => entry.verify).flatMap(entry => [entry.title, entry.shortTitle, entry.slug]),
  ...experience.filter(entry => entry.verify).map(entry => entry.role),
]);

let count = 0;
const failures = [];
async function scan(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(path);
    } else if (entry.isFile()) {
      const contents = await readFile(path);
      if (entry.name === 'index.html' || contents.length) count++;
      for (const value of prohibited) {
        if (contents.includes(value)) failures.push(`${relative(output, path)}: ${value}`);
      }
    }
  }
}

await scan(output);
if (failures.length || !count) {
  console.error(failures.join('\n') || 'Content guard found no build output.');
  process.exitCode = 1;
} else {
  console.log(`Content guard passed: ${count} built files scanned, ${prohibited.size} prohibited strings checked.`);
}
