export const API = {
  GEOCODING: "https://geocoding-api.open-meteo.com/v1/search",
  FORECAST: "https://api.open-meteo.com/v1/forecast",
  AIR_QUALITY: "https://air-quality.api.open-meteo.com/v1/air-quality",
  NOMINATIM: "https://nominatim.openstreetmap.org/reverse",
} as const;

export const STORAGE_KEYS = {
  TEMP_UNIT: "skymind-temp-unit",
  THEME: "skymind-theme",
  FAVORITES: "skymind-favorites",
  CACHED_WEATHER: "skymind-cached-weather",
} as const;
