# Testing

## Setup

- **Vitest** – test runner (`vitest.config.ts`)
- **React Testing Library** – component tests
- **@testing-library/user-event** – user interactions
- **@testing-library/jest-dom** – DOM matchers
- **jsdom** – DOM environment
- **`src/test/setup.ts`** – imports jest-dom

## Commands

```bash
npm run test           # watch mode
npm run test:run       # single run
npm run test:coverage   # with coverage
```

## Structure

| Path | Coverage |
|------|----------|
| `tests/lib/utils/*.test.ts` | Validation, weather codes |
| `tests/lib/api/*.test.ts` | API functions (mocked fetch) |
| `tests/lib/errors.test.ts` | Error utilities |
| `tests/components/weather/*.test.tsx` | SearchBar, WeatherCard, ForecastSection |
| `tests/app/page.test.tsx` | Home page |

## Patterns

- **API tests**: Mock `fetch` with `vi.stubGlobal("fetch", vi.fn())`
- **Component tests**: Mock `@/lib/api/weather`; pass `debounceMs={0}` to SearchBar for instant search in tests
- **Page tests**: Mock both API and child components
- **userEvent**: Use `userEvent.setup()` before interactions
