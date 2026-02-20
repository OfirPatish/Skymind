export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone: string;
  country_code: string;
  country: string;
  admin1?: string;
};

export type GeocodingResponse = {
  results?: GeocodingResult[];
};

export type TemperatureUnit = "celsius" | "fahrenheit";

export type WeatherForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    uv_index?: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max?: number[];
    sunrise?: string[];
    sunset?: string[];
    uv_index_max?: number[];
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability?: number[];
  };
};

export type WeatherDisplayLocation = {
  name: string;
  country: string;
  countryCode: string;
  admin1?: string;
  lat: number;
  lon: number;
  timezone: string;
};
