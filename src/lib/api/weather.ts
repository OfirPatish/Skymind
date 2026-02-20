import { API } from "../constants";
import { WeatherApiError } from "../errors";
import { validateCoordinates, validateSearchQuery, validateTimezone } from "../utils/validation";
import type {
  GeocodingResponse,
  WeatherForecastResponse,
  WeatherDisplayLocation,
  TemperatureUnit,
} from "../types/weather";

type OpenMeteoErrorResponse = {
  error?: boolean;
  reason?: string;
};

const handleApiResponse = async <T>(
  res: Response,
  parse: () => Promise<T>,
  fallbackMsg: string
): Promise<T> => {
  let data: T | OpenMeteoErrorResponse;
  try {
    data = await parse();
  } catch {
    throw new WeatherApiError("Invalid response from weather service", res.status);
  }

  const errData = data as OpenMeteoErrorResponse;
  if (errData?.error && typeof errData.reason === "string") {
    throw new WeatherApiError(errData.reason, res.status, errData.reason);
  }

  if (!res.ok) {
    throw new WeatherApiError(
      fallbackMsg,
      res.status,
      typeof (data as OpenMeteoErrorResponse).reason === "string"
        ? (data as OpenMeteoErrorResponse).reason
        : undefined
    );
  }

  return data as T;
};

export const searchLocations = async (
  query: string
): Promise<WeatherDisplayLocation[]> => {
  const { valid } = validateSearchQuery(query);
  if (!valid) return [];

  const params = new URLSearchParams({
    name: query.trim().slice(0, 100),
    count: "8",
  });

  try {
    const res = await fetch(`${API.GEOCODING}?${params}`);
    const data = await handleApiResponse<GeocodingResponse>(
      res,
      () => res.json(),
      "Failed to search locations"
    );

    if (!data.results?.length) return [];

    return data.results.map((r) => ({
      name: r.name,
      country: r.country,
      countryCode: r.country_code,
      admin1: r.admin1,
      lat: r.latitude,
      lon: r.longitude,
      timezone: r.timezone,
    }));
  } catch {
    throw new WeatherApiError("Unable to search locations. Check your connection.");
  }
};

export const reverseGeocode = async (
  lat: number,
  lon: number,
  lang?: string
): Promise<Omit<WeatherDisplayLocation, "lat" | "lon" | "timezone"> | null> => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
  });
  if (lang) params.set("lang", lang);

  try {
    const res = await fetch(`/api/reverse-geocode?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.name) return null;
    return {
      name: data.name,
      country: data.country ?? "",
      countryCode: (data.countryCode ?? "").toUpperCase(),
      admin1: data.admin1,
    };
  } catch {
    return null;
  }
};

export const fetchWeather = async (
  lat: number,
  lon: number,
  timezone: string,
  unit: TemperatureUnit = "celsius"
): Promise<WeatherForecastResponse> => {
  const coordCheck = validateCoordinates(lat, lon);
  if (!coordCheck.valid) {
    throw new WeatherApiError(coordCheck.error ?? "Invalid coordinates");
  }

  const tzCheck = validateTimezone(timezone);
  if (!tzCheck.valid) {
    throw new WeatherApiError(tzCheck.error ?? "Invalid timezone");
  }

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    timezone,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index",
    hourly:
      "temperature_2m,weather_code,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max",
    forecast_days: "7",
    temperature_unit: unit,
    wind_speed_unit: unit === "fahrenheit" ? "mph" : "kmh",
  });

  try {
    const res = await fetch(`${API.FORECAST}?${params}`);
    const data = await handleApiResponse<WeatherForecastResponse>(
      res,
      () => res.json(),
      "Failed to fetch weather"
    );

    if (!data.current && !data.daily) {
      throw new WeatherApiError("No weather data returned");
    }

    return data;
  } catch (err) {
    if (err instanceof WeatherApiError) throw err;
    throw new WeatherApiError(
      "Unable to load weather. Please check your connection and try again."
    );
  }
};

export type AirQualityResponse = {
  hourly?: {
    time?: string[];
    us_aqi?: number[];
  };
};

export const fetchAirQuality = async (
  lat: number,
  lon: number
): Promise<AirQualityResponse | null> => {
  const coordCheck = validateCoordinates(lat, lon);
  if (!coordCheck.valid) return null;

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
  });

  try {
    const res = await fetch(`/api/air-quality?${params}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};
