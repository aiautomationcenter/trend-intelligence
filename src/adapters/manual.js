import { readFile } from "node:fs/promises";
import { normalizeSignal } from "../signal.js";

export async function collectManualSignals(path = "data/manual-signals.json") {
  try {
    const raw = JSON.parse(await readFile(path, "utf8"));
    if (!Array.isArray(raw)) throw new Error("Manual signal file must contain an array");
    return raw.map(normalizeSignal);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

