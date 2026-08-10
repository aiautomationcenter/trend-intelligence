# Agency Trend Intelligence

Private, source-traceable trend collection for PureVeil and Somni AI.

This service combines permitted data from:

- TikTok Business API: the agency's authorized account and advertising data.
- Meta Graph API: authorized Instagram Professional account insights.
- Google Trends: manually exported or approved provider data.
- TikTok Creative Center and Instagram discovery: manual dated observations only.

It does **not** scrape private endpoints, rotate cookies, bypass CAPTCHAs, evade regional controls, or claim that Instagram editorial signals are search volume.

## What it produces

Each signal is normalized to this contract:

```json
{
  "brand": "PureVeil",
  "platform": "tiktok",
  "term": "skin barrier repair",
  "signal_type": "creative_center_7d",
  "observed_at": "2026-08-10T07:15:00+01:00",
  "region": "NG",
  "value": 82,
  "value_kind": "relative_index",
  "source_url": "https://ads.tiktok.com/business/creativecenter/",
  "confidence": "medium",
  "notes": "Manual authenticated observation"
}
```

The resulting JSON can be passed to the Agency HQ Research Agent. Records always preserve source, observation date, region, confidence and measurement type.

## Setup

1. Copy `.env.example` to `.env` and populate only the credentials you have been officially granted.
2. Never commit `.env` or access tokens.
3. Add manual public observations to `data/manual-signals.json` using the example file.
4. Run `npm test`.
5. Run `npm run collect`.

Official API access must be approved separately by TikTok and Meta. This repository does not unlock unavailable platform data.

## Environment variables

- `TIKTOK_ACCESS_TOKEN`
- `TIKTOK_ADVERTISER_ID`
- `META_ACCESS_TOKEN`
- `INSTAGRAM_ACCOUNT_ID`
- `BASE44_APP_ID`
- `BASE44_SERVICE_TOKEN` (only if Agency HQ provides an authorized server-side token)

## Safety boundaries

- Own-account analytics and explicitly authorized business data only.
- No passwords or browser cookies.
- No unofficial Instagram private API.
- No TikTok request signing or token rotation intended to imitate private clients.
- Missing access is recorded as unavailable, never silently replaced with fabricated data.

