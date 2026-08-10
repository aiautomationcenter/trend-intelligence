import { mkdir, writeFile } from "node:fs/promises";
import { importGoogleTrendsCsv } from "./adapters/google-trends-csv.js";

const [inputPath, brand = "PureVeil", region = "NG"] = process.argv.slice(2);
if (!inputPath) {
  console.error('Usage: npm run import:google -- "/path/to/multiTimeline.csv" "PureVeil" NG');
  process.exit(1);
}

const signals = await importGoogleTrendsCsv(inputPath, { brand, region });
await mkdir("data/imported", { recursive: true });
const outputPath = `data/imported/google-trends-${Date.now()}.json`;
await writeFile(outputPath, `${JSON.stringify(signals, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ output: outputPath, signal_count: signals.length, brand, region }, null, 2));
