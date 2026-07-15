import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');
const distDir = join(root, 'dist');
const clientDir = join(distDir, 'client');
const serverDir = join(distDir, 'server');

function copyRecursive(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) copyRecursive(from, to);
    else cpSync(from, to);
  }
}

if (!existsSync(outDir)) {
  throw new Error('out/ not found — run the Next.js export first');
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(serverDir, { recursive: true });
copyRecursive(outDir, clientDir);

writeFileSync(
  join(serverDir, 'index.js'),
  `export default {\n  async fetch(request, env) {\n    return env.ASSETS.fetch(request);\n  }\n};\n`
);

console.log('prepared dist/client and dist/server for Sites hosting');
