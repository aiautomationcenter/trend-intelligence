const allowedBrands = new Set(["PureVeil", "Somni AI"]);
const allowedPlatforms = new Set(["tiktok", "instagram", "google"]);
const allowedConfidence = new Set(["low", "medium", "high"]);

export function normalizeSignal(input) {
  const signal = {
    brand: String(input.brand ?? "").trim(),
    platform: String(input.platform ?? "").trim().toLowerCase(),
    term: String(input.term ?? "").trim(),
    signal_type: String(input.signal_type ?? "").trim(),
    observed_at: String(input.observed_at ?? "").trim(),
    region: String(input.region ?? "").trim().toUpperCase(),
    value: input.value === null || input.value === undefined ? null : Number(input.value),
    value_kind: String(input.value_kind ?? "").trim(),
    source_url: String(input.source_url ?? "").trim(),
    confidence: String(input.confidence ?? "").trim().toLowerCase(),
    notes: String(input.notes ?? "").trim()
  };

  if (!allowedBrands.has(signal.brand)) throw new Error(`Unsupported brand: ${signal.brand}`);
  if (!allowedPlatforms.has(signal.platform)) throw new Error(`Unsupported platform: ${signal.platform}`);
  if (!allowedConfidence.has(signal.confidence)) throw new Error(`Invalid confidence: ${signal.confidence}`);
  if (!signal.term || !signal.signal_type || !signal.value_kind) throw new Error("Missing signal fields");
  if (Number.isNaN(Date.parse(signal.observed_at))) throw new Error("Invalid observed_at");
  if (!/^https:\/\//.test(signal.source_url)) throw new Error("source_url must be HTTPS");
  if (signal.value !== null && !Number.isFinite(signal.value)) throw new Error("value must be numeric or null");
  if (signal.platform === "instagram" && signal.signal_type === "editorial_discovery") {
    signal.value = null;
    signal.value_kind = "not_public_volume";
  }
  return signal;
}

