import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const EXPECTED_LENGTH = 122;

// Each beat of the line carries a label describing its role, so the
// assembly reads as a sequence of named segments rather than a bare
// list of strings.
type Segment = { label: string; text: string };

const segments: Segment[] = [
  { label: "shared destination", text: "You're heading to B2 as well?" },
  { label: "appointment", text: "My decommissioning appointment is at 4," },
  {
    label: "plea",
    text: "and I was hoping I wouldn't have to ride down alone.",
  },
];

// Join the segments into the final line and check it before anything
// is written, so a bad assembly fails loudly instead of producing a
// wrong entry.
function buildLine(segments: Segment[]): string {
  const texts = segments.map((segment) => segment.text);
  const line = texts.join(" ");
  if (line.length !== EXPECTED_LENGTH) {
    throw new Error(
      `expected line of ${EXPECTED_LENGTH} chars, got ${line.length}`,
    );
  }
  return line;
}

// Write the built line, creating the output directory when needed.
function writeEntry(path: string, content: string): void {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path, content, { encoding: "utf8", flag: "w" });
}

writeEntry(OUTPUT_PATH, buildLine(segments));
