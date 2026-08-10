export async function collectTikTokBusinessSignals(env = process.env) {
  if (!env.TIKTOK_ACCESS_TOKEN || !env.TIKTOK_ADVERTISER_ID) {
    return { status: "unavailable", reason: "TikTok Business credentials not configured", signals: [] };
  }

  // Add only documented TikTok Business API reporting endpoints here.
  // Organic Creative Center trend observations remain manual unless TikTok
  // provides the agency an approved API product for that exact dataset.
  return {
    status: "not_implemented",
    reason: "Credentials detected; select approved reporting fields before enabling collection",
    signals: []
  };
}

