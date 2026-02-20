# API Integration

## Open-Meteo

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search` — city search by name
- **Forecast**: `https://api.open-meteo.com/v1/forecast` — weather by lat/lon
- **URLs**: Centralized in `lib/constants.ts` as `API.GEOCODING`, `API.FORECAST`
- **Auth**: None required (non-commercial)
- **Limits**: 10k/day, 5k/hour

## Data Flow

1. User types city (debounced 300ms) → `searchLocations(query)` → Geocoding API → location results
2. User selects location → `fetchWeather(lat, lon, timezone)` → Forecast API → current + 7-day

## Key Params

| Endpoint | Params |
|----------|--------|
| Geocoding | `name`, `count` |
| Forecast | `latitude`, `longitude`, `timezone`, `current`, `hourly`, `daily`, `forecast_days`, `temperature_unit`, `wind_speed_unit` |

## Utils

- **weather-codes.ts**: `getWeatherCodeInfo(code)` → label + icon; `getWindDirection(degrees)` → cardinal (N, NE, ...)
- **temperature.ts**: `convertTemp(celsius, unit)`, `formatTemp(celsius, unit)` — °C / °F conversion
- **reverseGeocode**: Nominatim (OpenStreetMap) — lat/lon → city name for geolocation
- **fetchAirQuality**: Open-Meteo Air Quality API — US AQI by lat/lon
