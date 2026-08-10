import { readFile } from "node:fs/promises";
import { normalizeSignal } from "../signal.js";

function splitCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index + 1] === '"' && quoted) {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function cleanTerm(header) {
  return header.replace(/:\s*\([^)]*\)\s*$/u, "").trim();
}

export function parseGoogleTrendsCsv(csv, options = {}) {
  const brand = options.brand ?? "PureVeil";
  const region = options.region ?? "NG";
  const sourceUrl = options.sourceUrl ?? "https://trends.google.com/trends/";
  const lines = csv.replace(/^\uFEFF/u, "").split(/\r?\n/u).filter((line) => line.trim());
  const headerIndex = lines.findIndex((line) => /^(Day|Week|Month|Year),/iu.test(line.trim()));
  if (headerIndex < 0) throw new Error("Could not find a Google Trends timeline header");

  const headers = splitCsvLine(lines[headerIndex]);
  if (headers.length < 2) throw new Error("Google Trends CSV contains no search terms");
  const interval = headers[0].toLowerCase();
  const signals = [];

  for (const line of lines.slice(headerIndex + 1)) {
    const cells = splitCsvLine(line);
    const observedAt = cells[0];
    if (!observedAt || Number.isNaN(Date.parse(observedAt))) continue;
    for (let column = 1; column < headers.length; column += 1) {
      const rawValue = cells[column]?.replace(/^<+/u, "").trim();
      if (!rawValue || rawValue === "-") continue;
      signals.push(normalizeSignal({
        brand,
        platform: "google",
        term: cleanTerm(headers[column]),
        signal_type: `google_trends_${interval}`,
        observed_at: new Date(observedAt).toISOString(),
        region,
        value: Number(rawValue),
        value_kind: "relative_interest_0_100",
        source_url: sourceUrl,
        confidence: "high",
        notes: "Imported from a dated Google Trends CSV export; values are relative interest, not search volume."
      }));
    }
  }
  return signals;
}

export async function importGoogleTrendsCsv(path, options) {
  return parseGoogleTrendsCsv(await readFile(path, "utf8"), options);
}
