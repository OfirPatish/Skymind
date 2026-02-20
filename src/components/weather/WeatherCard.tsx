"use client";

import { motion } from "motion/react";
import { Droplets, Wind, Sun, Compass } from "lucide-react";
import { getWeatherCodeInfo, getWindDirection } from "@/lib/utils/weather-codes";
import { WeatherIcon } from "./WeatherIcon";
import type { WeatherForecastResponse } from "@/lib/types/weather";
import type { WeatherDisplayLocation } from "@/lib/types/weather";
import type { TemperatureUnit } from "@/lib/types/weather";

type WeatherCardProps = {
  weather: WeatherForecastResponse;
  location: WeatherDisplayLocation;
  unit?: TemperatureUnit;
};

export const WeatherCard = ({ weather, location, unit = "celsius" }: WeatherCardProps) => {
  const current = weather.current;
  if (!current) return null;

  const { label } = getWeatherCodeInfo(current.weather_code);
  const windDir = getWindDirection(current.wind_direction_10m);

  return (
    <motion.div
      className="card bg-base-200/50 border border-base-300/30 shadow-xl backdrop-blur-sm overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="card-body gap-0 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight break-words">
              {location.country ? `${location.name}, ${location.country}` : location.name}
            </h2>
            {location.admin1 && (
              <p className="text-sm text-base-content/40 mt-0.5">
                {location.admin1}
              </p>
            )}
          </div>
          <span className="badge badge-ghost badge-sm text-base-content/60 shrink-0 rounded-xl">
            {label}
          </span>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 py-8 sm:py-10">
          <motion.div
            className="shrink-0 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <WeatherIcon code={current.weather_code} size={80} className="drop-shadow-md" />
          </motion.div>
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-none">
              {Math.round(current.temperature_2m)}°
            </p>
            <p className="text-base-content/50 text-sm mt-2">
              Feels like {Math.round(current.apparent_temperature)}°
            </p>
          </div>
        </div>

        {(weather.daily?.sunrise?.[0] ?? weather.daily?.sunset?.[0]) && (
          <p className="text-sm text-base-content/50 pt-4 border-t border-base-300/20">
            Sunrise {weather.daily.sunrise?.[0]?.slice(-5) ?? "—"} · Sunset {weather.daily.sunset?.[0]?.slice(-5) ?? "—"}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-base-300/20">
          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-2xl bg-base-300/20 min-w-0"
            aria-label={`Humidity: ${current.relative_humidity_2m}%`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Droplets className="size-5 text-info" strokeWidth={2} aria-hidden />
            <span className="text-base sm:text-lg md:text-xl font-bold">
              {current.relative_humidity_2m}%
            </span>
            <span className="text-xs text-base-content/40">Humidity</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-2xl bg-base-300/20 min-w-0"
            aria-label={`Wind speed: ${current.wind_speed_10m} km/h`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Wind className="size-5 text-secondary" strokeWidth={2} aria-hidden />
            <span className="text-base sm:text-lg md:text-xl font-bold">
              {current.wind_speed_10m}
            </span>
            <span className="text-xs text-base-content/40">
              {unit === "fahrenheit" ? "mph" : "km/h"}
            </span>
          </motion.div>

          {current.uv_index != null && (
            <motion.div
              className="flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-2xl bg-base-300/20 min-w-0"
              aria-label={`UV index: ${current.uv_index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Sun className="size-5 text-warning" strokeWidth={2} aria-hidden />
              <span className="text-base sm:text-lg md:text-xl font-bold">
                {current.uv_index}
              </span>
              <span className="text-xs text-base-content/40">UV</span>
            </motion.div>
          )}
          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 rounded-2xl bg-base-300/20 min-w-0"
            aria-label={`Wind direction: ${windDir}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Compass className="size-5 text-accent" strokeWidth={2} aria-hidden />
            <span className="text-base sm:text-lg md:text-xl font-bold">{windDir}</span>
            <span className="text-xs text-base-content/40">Direction</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
