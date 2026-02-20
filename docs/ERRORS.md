# Error Handling

## Custom Errors

- **WeatherApiError**: Thrown by API layer; includes optional `status` and `reason`
- **getErrorMessage(err)**: Safe extraction of user-facing message from any error

## Validation

| Utility | Validates |
|---------|-----------|
| `validateSearchQuery` | 2–100 chars, non-empty |
| `validateCoordinates` | lat ∈ [-90,90], lon ∈ [-180,180] |
| `validateTimezone` | Non-empty string |

## Error Boundaries

- **error.tsx**: Page-level; catch + reset
- **global-error.tsx**: Root fallback (plain HTML)
- **not-found.tsx**: 404 with link home

## API Error Flow

1. Invalid params → `WeatherApiError` before fetch
2. HTTP 4xx/5xx or `{ error: true }` body → `WeatherApiError` with reason
3. Network failure → `WeatherApiError` with connection message
4. Page catches → displays via `getErrorMessage(err)`
