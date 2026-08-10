export async function collectInstagramInsights(env = process.env) {
  if (!env.META_ACCESS_TOKEN || !env.INSTAGRAM_ACCOUNT_ID) {
    return { status: "unavailable", reason: "Meta/Instagram credentials not configured", signals: [] };
  }

  // Use Meta Graph API only for the connected Professional account and
  // approved permissions. Instagram discovery observations are not volume.
  return {
    status: "not_implemented",
    reason: "Credentials detected; approve exact insight metrics before enabling collection",
    signals: []
  };
}

