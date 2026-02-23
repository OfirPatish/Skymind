# Skymind

Weather app. Search any city, use your location, get current conditions plus 7-day forecasts. No sign-up required. Next.js, DaisyUI, Open-Meteo, Nominatim.

**Live:** [opdev-skymind.vercel.app](https://opdev-skymind.vercel.app/)  
**GitHub:** [github.com/OfirPatish/skymind](https://github.com/OfirPatish/skymind)

## Highlights

- **Search** — City search with debounce, keyboard nav, combobox a11y
- **Geolocation** — "Use my location" with reverse geocode, localized place names
- **Forecasts** — Current, 24h hourly, 7-day
- **Details** — UV index, sunrise/sunset, air quality (US AQI)
- **Preferences** — °C/°F, light/dark theme (persisted)
- **Favorites** — Save locations, share links
- **Offline** — Cached last result when disconnected
- **PWA** — Add to home screen. No API keys required.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · DaisyUI 5 · Lucide React · Motion

APIs: [Open-Meteo](https://open-meteo.com), [Nominatim](https://nominatim.openstreetmap.org). No API keys.

## Quick start

1. **Clone & install** — `git clone https://github.com/OfirPatish/skymind.git && cd skymind && npm install`
2. **Run** — `npm run dev` → [http://localhost:3000](http://localhost:3000)
3. **Deploy** — Push to GitHub → import on [Vercel](https://vercel.com/new). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Commands

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm run test:run` | Run 53 tests |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── app/           Routes: /, /about, /privacy, /terms + API routes
├── components/   ui/ + weather/ (SearchBar, WeatherCard, etc.)
└── lib/           API, types, validation, weather-codes
tests/             53 tests
```

## Docs

| Doc | Purpose |
| --- | ------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Structure, conventions, tech |
| [docs/API.md](docs/API.md) | Open-Meteo, Nominatim, proxy routes |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel, PWA, checklist |
| [docs/TESTING.md](docs/TESTING.md) | Vitest, 53 tests, patterns |
| [docs/ERRORS.md](docs/ERRORS.md) | Error handling, validation |
