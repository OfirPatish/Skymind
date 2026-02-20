# Deployment (Vercel)

## Prerequisites

GitHub + Vercel account. **No API keys.**

## Steps

1. `git push origin main`
2. [vercel.com/new](https://vercel.com/new) → import repo → Deploy

## Config

Build: `npm run build` | Output: `.next` | Env vars: none

## Pre-Launch

```bash
npm run lint && npm test -- --run && npm run build
```

Verify: search, geolocation, theme, `/about`, `/privacy`, `/terms`, `/nonexistent` (404)

## PWA

`manifest.json` + `icon.svg` + meta tags. Add 192×192, 512×512 PNGs for best icon quality.
