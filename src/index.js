import { mkdir, writeFile } from "node:fs/promises";
import { collectManualSignals } from "./adapters/manual.js";
import { collectTikTokBusinessSignals } from "./adapters/tiktok.js";
import { collectInstagramInsights } from "./adapters/instagram.js";

const collectedAt = new Date().toISOString();
const [manual, tiktok, instagram] = await Promise.all([
  collectManualSignals(),
  collectTikTokBusinessSignals(),
  collectInstagramInsights()
]);

const report = {
  collected_at: collectedAt,
  signals: manual,
  coverage: { tiktok, instagram },
  rules: {
    instagram_editorial_is_volume: false,
    fabricated_metrics_allowed: false,
    private_endpoint_scraping_allowed: false
  }
};

await mkdir("output", { recursive: true });
await writeFile("output/latest.json", `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ collected_at: collectedAt, signal_count: manual.length, coverage: report.coverage }, null, 2));

