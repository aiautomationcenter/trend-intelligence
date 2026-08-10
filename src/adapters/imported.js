import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { normalizeSignal } from "../signal.js";

export async function collectImportedSignals(directory = "data/imported") {
  try {
    const files = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
    const batches = await Promise.all(files.map(async (name) => {
      const data = JSON.parse(await readFile(join(directory, name), "utf8"));
      if (!Array.isArray(data)) throw new Error(`${name} must contain an array`);
      return data.map(normalizeSignal);
    }));
    return batches.flat();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
