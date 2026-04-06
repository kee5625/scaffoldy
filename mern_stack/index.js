#!/usr/bin/env node

import { cp, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [, , projectName] = process.argv;

if (!projectName) {
  console.error('Usage: create-mern-app <project-name>');
  process.exit(1);
}

await mkdir(projectName, { recursive: true });
await cp(join(__dirname, 'templates/base'), join(projectName), {
  recursive: true
});

console.log(`Created ${projectName} from base template`);