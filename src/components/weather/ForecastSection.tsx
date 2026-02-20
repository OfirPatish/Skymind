"use client";

import { motion } from "motion/react";
import { CloudRain } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import type { WeatherForecastResponse } from "@/lib/types/weather";

type ForecastSectionProps = {
  weather: WeatherForecastResponse;
};

const formatDay = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return "Today";
  if (date.getTime() === tomorrow.getTime()) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const formatShortDate = (dateStr: string): string => {
  const [, month, day] = dateStr.split("-").map(Number);
  const date = new Date(2024, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const ForecastSection = ({ weather }: ForecastSectionProps) => {
  const daily = weather.daily;
  if (!daily?.time?.length) return null;

  return (
    <motion.section
      aria-labelledby="forecast-heading"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h3 id="forecast-heading" className="text-lg font-semibold mb-4">
        7-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
        {daily.time.map((dateStr, i) => {
          const weatherCode = daily.weather_code[i] ?? 0;
          const maxTemp = daily.temperature_2m_max[i];
          const minTemp = daily.temperature_2m_min[i];
          const precip = daily.precipitation_sum?.[i];
          const precipProb = daily.precipitation_probability_max?.[i];
          const dayLabel = formatDay(dateStr);
          const isToday = dayLabel === "Today";

          const precipDisplay = (() => {
            if (precipProb != null && precipProb > 0) return `${precipProb}%`;
            if (precip != null && precip > 0) return `${precip} mm`;
            return null;
          })();

          return (
            <motion.div
              key={dateStr}
              className={`card border shadow-sm transition-colors hover:bg-base-200/70 rounded-2xl overflow-hidden ${
                isToday
                  ? "bg-primary/5 border-primary/20"
                  : "bg-base-200/40 border-base-300/30"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="card-body p-2.5 sm:p-4 gap-1 sm:gap-1.5 items-center text-center min-w-0">
                <p
                  className={`font-semibold text-sm ${
                    isToday ? "text-primary" : ""
                  }`}
                >
                  {dayLabel}
                </p>
                <p className="text-[11px] text-base-content/40 leading-none">
                  {formatShortDate(dateStr)}
                </p>
                <WeatherIcon
                  code={weatherCode}
                  size={36}
                  className="text-primary my-1 shrink-0"
                />
                <div className="text-sm">
                  <span className="font-bold">
                    {Math.round(maxTemp ?? 0)}°
                  </span>
                  <span className="text-base-content/40 mx-0.5">/</span>
                  <span className="text-base-content/50">
                    {Math.round(minTemp ?? 0)}°
                  </span>
                </div>
                {precipDisplay && (
                  <p className="text-xs text-info flex items-center gap-1">
                    <CloudRain className="size-3" strokeWidth={2} aria-hidden />
                    {precipDisplay}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
