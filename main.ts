// The Funniest Honest Appliance Error — make.fun entry
// Writes a single line (at most 200 characters): the funniest honest error
// message an appliance could show — a microwave, deadpan, telling the truth
// about what went wrong — to /output/entry.txt.
// Deterministic: no randomness, no network, no clock, no environment input.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "ERROR: Food still cold in the middle. I heated the plate instead. The plate was not hungry.";

// The competition requires a single line of 1 to 200 characters.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error(`Entry must be one line of 1-200 characters, got ${ENTRY.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
