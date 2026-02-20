# Architecture

## Project Structure

```
vercel.json                # Vercel config
vitest.config.ts           # Vitest + React + @/ alias
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, metadata
│   ├── page.tsx            # Home / Weather page
│   ├── globals.css         # Tailwind + DaisyUI
│   ├── error.tsx           # Page-level error boundary
│   ├── global-error.tsx    # Root fallback
│   ├── not-found.tsx       # 404 page
│   ├── about/page.tsx      # About the project
│   ├── privacy/page.tsx    # Privacy policy
│   └── terms/page.tsx      # Terms of use
├── components/
│   ├── index.ts            # Barrel exports (ui + weather)
│   ├── ui/                 # Generic UI controls
│   │   ├── index.ts
│   │   ├── ThemeToggle.tsx
│   │   └── UnitToggle.tsx
│   └── weather/
│       ├── index.ts        # Barrel exports
│       ├── AirQuality.tsx
│       ├── FavoriteButton.tsx
│       ├── FavoritesBar.tsx
│       ├── HourlyForecast.tsx
│       ├── LocationButton.tsx
│       ├── SearchBar.tsx
│       ├── ShareButton.tsx
│       ├── WeatherCard.tsx
│       └── ForecastSection.tsx
├── lib/
│   ├── index.ts
│   ├── constants.ts        # API base URLs
│   ├── errors.ts
│   ├── api/weather.ts
│   ├── types/weather.ts
│   ├── utils/validation.ts
│   ├── utils/weather-codes.ts
│   └── utils/temperature.ts
├── test/
    └── setup.ts            # Vitest + jest-dom setup
tests/                      # Test files (mirrored structure)
├── app/
├── components/weather/
└── lib/
```

## Conventions

- **Components**: Colocated in `components/` by feature; barrel exports via `index.ts`
- **Imports**: Use `@/` path alias (maps to `src/`)
- **Types**: Centralized in `lib/types/`
- **Client components**: Mark with `"use client"` when using hooks/state
- **Tests**: In `tests/` folder with mirrored structure (e.g. `tests/app/page.test.tsx`)

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 | Framework |
| React 19 | UI |
| TypeScript | Types |
| Tailwind CSS 4 | Styling |
| DaisyUI 5 | Components (navbar, card, input, alert, badge, btn, menu) |
| Lucide React | Icons (Cloud, Search, MapPin, Heart, etc.) |
| Motion | Animations (fade, scale, stagger) |
| Open-Meteo | Weather API (no key) |
| Nominatim | Reverse geocoding for "Use my location" |

## UI Notes

- **Themes**: `light` (default), `dark` (prefers-color-scheme: dark)
- **globals.css**: Custom utilities; DaisyUI themes (light/dark)
- **Rounding**: `rounded-2xl` / `rounded-3xl` for cards, inputs, buttons
- **Colors**: DaisyUI semantic tokens (`text-base-content`, `bg-primary`, `text-info`, etc.) for theme-aware styling
