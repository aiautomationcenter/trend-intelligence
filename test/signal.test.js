import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSignal } from "../src/signal.js";

test("normalizes a valid dated signal", () => {
  const signal = normalizeSignal({
    brand: "PureVeil",
    platform: "TikTok",
    term: "skin barrier",
    signal_type: "creative_center_7d",
    observed_at: "2026-08-10T07:15:00+01:00",
    region: "ng",
    value: 82,
    value_kind: "relative_index",
    source_url: "https://ads.tiktok.com/business/creativecenter/",
    confidence: "medium"
  });
  assert.equal(signal.platform, "tiktok");
  assert.equal(signal.region, "NG");
});

test("never treats Instagram editorial discovery as volume", () => {
  const signal = normalizeSignal({
    brand: "Somni AI",
    platform: "instagram",
    term: "sleepmaxxing",
    signal_type: "editorial_discovery",
    observed_at: "2026-08-10T07:15:00+01:00",
    region: "NG",
    value: 1000,
    value_kind: "search_volume",
    source_url: "https://www.instagram.com/",
    confidence: "low"
  });
  assert.equal(signal.value, null);
  assert.equal(signal.value_kind, "not_public_volume");
});

