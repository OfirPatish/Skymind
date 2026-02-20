# Error Handling

## Custom Errors

- **WeatherApiError**: API layer; optional `status`, `reason`
- **getErrorMessage(err)**: Safe user-facing message

## Validation

`validateSearchQuery` (2–100 chars) | `validateCoordinates` (lat/lon) | `validateTimezone` (non-empty)

## Boundaries

- **error.tsx**: Page-level, try again + home
- **global-error.tsx**: Root fallback
- **not-found.tsx**: 404 + link home

## Flow

Invalid params → `WeatherApiError` before fetch. HTTP/network failure → catch → `getErrorMessage` → display.
