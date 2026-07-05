import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');

const copyDirs = ['mixflow', 'perler', 'chiwu', 'gallery', 'assets', 'scripts'];

function copyRecursive(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) {
      copyRecursive(from, to);
    } else {
      cpSync(from, to);
    }
  }
}

if (!existsSync(outDir)) {
  console.error('out/ not found — run next build first');
  process.exit(1);
}

for (const dir of copyDirs) {
  copyRecursive(join(root, dir), join(outDir, dir));
  console.log(`copied ${dir}/ → out/${dir}/`);
}

// Sync root static export for static hosting convenience.
rmSync(join(root, '_next'), { recursive: true, force: true });
copyRecursive(join(outDir, '_next'), join(root, '_next'));
console.log('synced out/_next/ → _next/');

cpSync(join(outDir, 'index.html'), join(root, 'index.html'));
console.log('synced out/index.html → index.html');
