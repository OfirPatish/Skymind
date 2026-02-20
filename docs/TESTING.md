# Testing

## Setup

Vitest, React Testing Library, user-event, jest-dom. Config: `vitest.config.ts`, setup: `src/test/setup.ts`.

## Commands

`npm run test` (watch) | `npm run test:run` | `npm run test:coverage`

## Coverage (53 tests)

| Path | Tests |
|------|-------|
| `tests/lib/` | errors, validation, weather-codes, api/weather |
| `tests/components/weather/` | SearchBar, WeatherCard, ForecastSection |
| `tests/app/` | page, not-found |

## Patterns

- API: `vi.stubGlobal("fetch", vi.fn())`
- Components: Mock `@/lib/api/weather`; `debounceMs={0}` for SearchBar
- Page: Mock API + child components
