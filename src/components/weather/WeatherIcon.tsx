"use client";

import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";

type WeatherIconProps = {
  code: number;
  className?: string;
  size?: number;
  "aria-label"?: string;
};

const CODE_TO_ICON: Record<number, LucideIcon> = {
  0: Sun,
  1: CloudSun,
  2: CloudSun,
  3: Cloud,
  45: CloudFog,
  48: CloudFog,
  51: CloudDrizzle,
  53: CloudDrizzle,
  55: CloudDrizzle,
  56: CloudSnow,
  57: CloudSnow,
  61: CloudRain,
  63: CloudRain,
  65: CloudLightning,
  66: CloudSnow,
  67: CloudSnow,
  71: CloudSnow,
  73: CloudSnow,
  75: CloudSnow,
  77: CloudSnow,
  80: CloudRain,
  81: CloudRain,
  82: CloudLightning,
  85: CloudSnow,
  86: CloudSnow,
  95: CloudLightning,
  96: CloudLightning,
  99: CloudLightning,
};

export const WeatherIcon = ({
  code,
  className = "",
  size = 48,
  "aria-label": ariaLabel,
}: WeatherIconProps) => {
  const Icon = CODE_TO_ICON[code] ?? Thermometer;
  const { label } = getWeatherCodeInfo(code);

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={1.5}
      aria-label={ariaLabel ?? label}
      aria-hidden={!ariaLabel}
    />
  );
};
