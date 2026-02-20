"use client";

import { motion } from "motion/react";
import { Activity, Info } from "lucide-react";
import type { AirQualityResponse } from "@/lib/api/weather";

type AirQualityProps = {
  data: AirQualityResponse | null;
};

const getAqiLabel = (aqi: number): string => {
  const v = Math.round(aqi);
  if (v <= 50) return "Good";
  if (v <= 100) return "Moderate";
  if (v <= 150) return "Unhealthy (sensitive)";
  if (v <= 200) return "Unhealthy";
  if (v <= 300) return "Very unhealthy";
  return "Hazardous";
};

const getAqiColorClass = (aqi: number): string => {
  const v = Math.round(aqi);
  if (v <= 50) return "text-success";
  if (v <= 100) return "text-warning";
  if (v <= 150) return "text-warning";
  if (v <= 200) return "text-error";
  return "text-error";
};

export const AirQuality = ({ data }: AirQualityProps) => {
  const aqi = data?.hourly?.us_aqi?.[0];
  const hasData = aqi != null;

  return (
    <motion.section
      className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-base-200/50 border border-base-300/30"
      aria-labelledby="air-quality-heading"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex size-12 items-center justify-center rounded-2xl shrink-0 ${
          hasData ? "bg-info/10" : "bg-base-300/30"
        }`}
      >
        {hasData ? (
          <Activity
            className={`size-6 ${getAqiColorClass(aqi)}`}
            strokeWidth={2}
            aria-hidden
          />
        ) : (
          <Info className="size-6 text-base-content/40" strokeWidth={2} aria-hidden />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 id="air-quality-heading" className="text-sm font-semibold mb-0.5">
          Air quality
        </h4>
        {hasData ? (
          <p className="text-base-content/80 text-sm">
            <span className={`font-bold ${getAqiColorClass(aqi)}`}>{aqi}</span>
            {" · "}
            {getAqiLabel(aqi)}
          </p>
        ) : (
          <p className="text-base-content/50 text-sm">
            Data not available for this location
          </p>
        )}
      </div>
    </motion.section>
  );
};
