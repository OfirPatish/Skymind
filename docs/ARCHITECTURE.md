# Architecture

## Structure

```
src/app/           # page.tsx, layout, error.tsx, not-found.tsx, global-error.tsx
│   about/, privacy/, terms/   # Static pages
│   api/reverse-geocode/, api/air-quality/   # Proxy routes (CORS)
├── components/ui/        # ThemeToggle, UnitToggle
├── components/weather/   # SearchBar, WeatherCard, HourlyForecast, ForecastSection,
│                         # AirQuality, ShareButton, FavoriteButton, FavoritesBar, WeatherIcon
├── lib/                  # constants, errors, api/weather, types, utils
└── test/setup.ts         # Vitest + jest-dom
tests/                    # Mirrored: app/, components/weather/, lib/
```

## Conventions

- `@/` → `src/` | Components by feature | Types in `lib/types/` | `"use client"` for hooks
- Tests in `tests/` with mirrored paths

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 | App Router |
| React 19, TypeScript | UI |
| Tailwind 4, DaisyUI 5 | Styling, components |
| Lucide React | Icons |
| Motion | Animations |
| Open-Meteo | Weather, air quality |
| Nominatim | Geocoding |

## API Routes

- `/api/reverse-geocode?lat=&lon=&lang=` — Proxies Nominatim (CORS, `accept-language`)
- `/api/air-quality?latitude=&longitude=` — Proxies Open-Meteo Air Quality (DNS)
