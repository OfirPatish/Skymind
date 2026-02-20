# Skymind

A modern weather app built with Next.js. Search any city, use your location, and get current conditions plus 7-day forecasts—no sign-up required.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

| Feature | Description |
|---------|-------------|
| **Search** | City search with debounce, keyboard nav, combobox a11y |
| **Geolocation** | "Use my location" with reverse geocode (localized place names) |
| **Forecasts** | Current, 24h hourly, 7-day |
| **Details** | UV index, sunrise/sunset, air quality (US AQI) |
| **Preferences** | °C/°F, light/dark theme (persisted) |
| **Favorites** | Save locations, share links |
| **Offline** | Cached last result when disconnected |
| **PWA** | Add to home screen |

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · DaisyUI 5 · Lucide React · Motion

APIs: [Open-Meteo](https://open-meteo.com) (weather, air quality), [Nominatim](https://nominatim.openstreetmap.org) (geocoding). No API keys.

## Project Structure

```
src/
├── app/           # Routes: /, /about, /privacy, /terms + API routes
├── components/    # ui/ (ThemeToggle, UnitToggle) + weather/ (SearchBar, WeatherCard, etc.)
└── lib/           # API, types, validation, weather-codes
tests/              # Mirrored structure, 53 tests
```

**Architecture**: App Router, client components where needed, server-side API routes for Nominatim/air-quality (CORS), `@/` path alias.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm run test:run` | Run 53 tests |
| `npm run lint` | ESLint |

## Deploy

No env vars. Push to GitHub → import on [Vercel](https://vercel.com/new) → deploy.

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for details.

## Docs

| Doc | Description |
|-----|-------------|
| [ARCHITECTURE](./docs/ARCHITECTURE.md) | Structure, conventions, tech |
| [API](./docs/API.md) | Open-Meteo, Nominatim, proxy routes |
| [DEPLOYMENT](./docs/DEPLOYMENT.md) | Vercel, PWA, checklist |
| [TESTING](./docs/TESTING.md) | Vitest, 53 tests, patterns |
| [ERRORS](./docs/ERRORS.md) | Error handling, validation |
