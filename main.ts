// Entry point: copies the one-line warning label in entry.txt to the
// grader's output directory. Node stdlib only.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// The gate requires UTF-8 text of 1-160 characters, not only whitespace.
const text = readFileSync(join(dir, "entry.txt"), "utf8");
const length = [...text].length;
if (length < 1 || length > 160 || text.trim().length === 0) {
  throw new Error(`entry.txt is ${length} code points; the gate needs 1-160 non-blank`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(join(dir, "entry.txt"), join(outDir, "entry.txt"));
