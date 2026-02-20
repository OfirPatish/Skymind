# Deployment (Vercel)

## Prerequisites

- GitHub account
- Vercel account (free tier works)

## No API Keys Required

Skymind uses **Open-Meteo** (weather) and **Nominatim** (geocoding) — both are free and do not require API keys. Deploy without any environment variables.

## Deploy Steps

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git push origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new) and import your repo
3. Vercel auto-detects Next.js
4. Click **Deploy**

## Config

- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (Next.js default)
- **Framework**: Next.js (auto-detected via `vercel.json`)
- **Env vars**: None required

## PWA / Add to Home Screen

The app is PWA-ready. Users can add it to their home screen on mobile.

- `manifest.json` — app name, icons, display mode
- `icon.svg` — app icon
- Meta tags — `apple-mobile-web-app-capable`, theme-color

For best icon quality on all devices, consider adding PNG icons (192×192, 512×512) to `public/` and updating `manifest.json`.

## Pre-Launch Checklist

Before deploying, run:

```bash
npm run lint      # 0 errors
npm test -- --run # 50+ tests pass
npm run build     # Successful build
```

Verify locally:

```bash
npm run start
# Visit http://localhost:3000
# Test: search, geolocation, theme toggle, /about, /privacy, /terms
# Visit /nonexistent — 404 page should render
```

## Local Build

```bash
npm run build
npm run start
```
