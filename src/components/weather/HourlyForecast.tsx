"use client";

import { motion } from "motion/react";
import { WeatherIcon } from "./WeatherIcon";
import type { WeatherForecastResponse } from "@/lib/types/weather";

type HourlyForecastProps = {
  weather: WeatherForecastResponse;
};

const HOURS_TO_SHOW = 24;

export const HourlyForecast = ({ weather }: HourlyForecastProps) => {
  const hourly = weather.hourly;
  if (!hourly?.time?.length) return null;

  const now = new Date();
  const startIndex = hourly.time.findIndex((t) => new Date(t) >= now);
  const safeStart = startIndex >= 0 ? startIndex : 0;
  const end = Math.min(safeStart + HOURS_TO_SHOW, hourly.time.length);
  const sliced = {
    time: hourly.time.slice(safeStart, end),
    temp: hourly.temperature_2m.slice(safeStart, end),
    code: hourly.weather_code.slice(safeStart, end),
    precip: hourly.precipitation_probability?.slice(safeStart, end),
  };

  if (sliced.time.length === 0) return null;

  return (
    <motion.section
      aria-labelledby="hourly-heading"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h3 id="hourly-heading" className="text-lg font-semibold mb-4">
        Next 24 Hours
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory overscroll-x-contain">
        {sliced.time.map((timeStr, i) => {
          const date = new Date(timeStr);
          const isNow = i === 0 && safeStart === 0;
          const temp = sliced.temp[i];
          const precip = sliced.precip?.[i];

          return (
            <motion.div
              key={timeStr}
              className={`flex flex-col items-center gap-1 py-3 px-3 rounded-2xl bg-base-200/50 border border-base-300/30 shrink-0 min-w-[4rem] snap-start ${
                isNow ? "ring-1 ring-primary/30" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.25 }}
            >
              <p className="text-xs font-medium">
                {isNow ? "Now" : date.toLocaleTimeString("en-US", { hour: "numeric" })}
              </p>
              <WeatherIcon code={sliced.code[i] ?? 0} size={28} className="text-primary shrink-0" />
              <p className="text-sm font-bold">
                {Math.round(temp ?? 0)}°
              </p>
              {precip != null && precip > 0 && (
                <p className="text-[10px] text-info">{precip}%</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
