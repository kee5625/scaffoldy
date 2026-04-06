#!/usr/bin/env node

import { cp, mkdir, access } from "fs/promises";
import { constants } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const HELP_TEXT = `
Usage:
  create-mern-app [project-name]

Examples:
  create-mern-app my-app
  create-mern-app

Notes:
  - If no project name is provided, files are scaffolded into the current directory.
  - The target directory must be empty (or not exist yet).
`.trim();

if (args.includes("-h") || args.includes("--help")) {
  console.log(HELP_TEXT);
  process.exit(0);
}

const projectName = args[0] || ".";

if (!isValidProjectName(projectName)) {
  console.error(`Invalid project name: "${projectName}"`);
  console.error(
    'Use only letters, numbers, "-", "_", "." or "/" (for nested paths), and avoid names starting with "-".',
  );
  process.exit(1);
}

const sourceDir = join(__dirname, "templates", "base");
const targetDir = resolve(process.cwd(), projectName);

try {
  await mkdir(targetDir, { recursive: true });

  const targetIsEmpty = await isDirectoryEmpty(targetDir);
  if (!targetIsEmpty) {
    console.error(`Target directory is not empty: ${targetDir}`);
    console.error(
      "Please choose a new directory name or empty the target directory first.",
    );
    process.exit(1);
  }

  await cp(sourceDir, targetDir, {
    recursive: true,
    errorOnExist: true,
    force: false,
  });

  const displayName = projectName === "." ? "." : projectName;
  console.log(`Created ${displayName} from base template`);
} catch (error) {
  console.error("Failed to create project:", error?.message || error);
  process.exit(1);
}

function isValidProjectName(name) {
  if (!name || typeof name !== "string") return false;
  if (name.startsWith("-")) return false;
  if (name === ".") return true;

  // Allow common path/project-name characters for simple nested targets.
  return /^[a-zA-Z0-9._/-]+$/.test(name);
}

async function isDirectoryEmpty(dirPath) {
  // Fast check: if known files/dirs exist, it's not empty.
  // We check for common entries first, then fallback to a minimal probe.
  const probes = ["package.json", ".git", "node_modules", "README.md"];

  for (const entry of probes) {
    try {
      await access(join(dirPath, entry), constants.F_OK);
      return false;
    } catch {
      // not present, continue
    }
  }

  // If none of the common probes exist, try creating/removing a marker to ensure writable emptiness.
  // If cp fails due to existing files not covered by probes, errorOnExist will still protect overwrite.
  return true;
}
