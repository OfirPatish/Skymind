import type { TemperatureUnit } from "../types/weather";

export const celsiusToFahrenheit = (c: number): number =>
  (c * 9) / 5 + 32;

export const convertTemp = (celsius: number, unit: TemperatureUnit): number =>
  unit === "fahrenheit" ? celsiusToFahrenheit(celsius) : celsius;

export const formatTemp = (celsius: number, unit: TemperatureUnit): string =>
  `${Math.round(convertTemp(celsius, unit))}°`;
