import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The line, assembled from its beats: the shared destination, the
// appointment, and the plea not to ride down alone.
const parts = [
  "You're heading to B2 as well?",
  "My decommissioning appointment is at 4,",
  "and I was hoping I wouldn't have to ride down alone.",
];
const line = parts.join(" ");

const dir = dirname(OUTPUT_PATH);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}
writeFileSync(OUTPUT_PATH, line, { encoding: "utf8", flag: "w" });
