# Skymind

Weather app built with Next.js, DaisyUI, and [Open-Meteo](https://open-meteo.com). Production-ready with tests, validation, and error handling.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test:run` | Run tests |
| `npm run test:coverage` | Tests with coverage |

## Features

- Debounced city search with keyboard nav
- **Use my location** (geolocation + reverse geocode)
- °C / °F unit toggle (persisted)
- **Theme toggle** (light/dark, persisted)
- Current weather + **24h hourly** + 7-day forecast
- **UV index**, sunrise/sunset, **air quality** (US AQI when available)
- **Favorites** (localStorage) | **Share link** (copy URL)
- **Offline** — cached last result when disconnected
- **PWA-ready** — add to home screen on mobile
- Error boundaries & 404 | 47 tests

## Documentation

See [`docs/`](./docs/README.md) for architecture, API, deployment, testing, and errors.
