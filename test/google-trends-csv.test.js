import test from "node:test";
import assert from "node:assert/strict";
import { parseGoogleTrendsCsv } from "../src/adapters/google-trends-csv.js";

test("imports Google Trends timeline exports as relative interest", () => {
  const csv = `Category: All categories\n\nWeek,skin barrier: (Nigeria),glass skin: (Nigeria)\n2026-08-02,82,41\n2026-08-09,<1,-\n`;
  const signals = parseGoogleTrendsCsv(csv, { brand: "PureVeil", region: "NG" });
  assert.equal(signals.length, 3);
  assert.equal(signals[0].term, "skin barrier");
  assert.equal(signals[0].value, 82);
  assert.equal(signals[0].value_kind, "relative_interest_0_100");
  assert.equal(signals[2].value, 1);
});
