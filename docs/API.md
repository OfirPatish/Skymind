# API Integration

## Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| Geocoding | `geocoding-api.open-meteo.com/v1/search` | City search |
| Forecast | `api.open-meteo.com/v1/forecast` | Weather |
| Air Quality | `air-quality.api.open-meteo.com/v1/air-quality` | US AQI |
| Nominatim | `nominatim.openstreetmap.org/reverse` | Reverse geocode |

All in `lib/constants.ts`. No auth.

## Proxy Routes (Next.js)

- **`/api/reverse-geocode`** — Nominatim (CORS). Params: `lat`, `lon`, optional `lang`. Uses `accept-language` when `lang` omitted.
- **`/api/air-quality`** — Air quality (avoids client DNS). Params: `latitude`, `longitude`.

## Data Flow

1. **Search**: `searchLocations(query)` → Geocoding API (client)
2. **Select**: `fetchWeather(lat, lon, tz, unit)` → Forecast API (client)
3. **Location**: `reverseGeocode(lat, lon, lang)` → `/api/reverse-geocode` → Nominatim
4. **Air**: `fetchAirQuality(lat, lon)` → `/api/air-quality` → Open-Meteo

## Utils

- `weather-codes.ts`: `getWeatherCodeInfo(code)` → label
- `WeatherIcon`: Lucide icons per WMO code
- `validation.ts`: search query, coordinates, timezone
