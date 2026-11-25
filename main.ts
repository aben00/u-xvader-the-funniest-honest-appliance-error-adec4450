// The Funniest Honest Appliance Error — make.fun entry
// Writes a single line (at most 200 characters): the funniest honest error
// message an appliance could show — a microwave, deadpan, telling the truth
// about what went wrong — to /output/entry.txt.
// Deterministic: no randomness, no network, no clock, no environment input.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "ERROR: Food still cold in the middle. I heated the plate instead. The plate was not hungry, but it is warm now.";

// The competition requires a single line of 1 to 200 UTF-8 characters,
// not whitespace only. Count code points (not UTF-16 units or bytes) so
// multi-byte characters are measured the way the limit intends.
function validateEntry(entry: string): void {
  const chars = [...entry];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${chars.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("Entry must not be whitespace only");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
}

validateEntry(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
