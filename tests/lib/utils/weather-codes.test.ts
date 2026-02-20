import { describe, it, expect } from "vitest";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";

describe("getWeatherCodeInfo", () => {
  it("returns correct info for clear sky", () => {
    expect(getWeatherCodeInfo(0)).toEqual({ label: "Clear sky" });
  });

  it("returns correct info for rain codes", () => {
    expect(getWeatherCodeInfo(61).label).toBe("Slight rain");
    expect(getWeatherCodeInfo(63).label).toBe("Moderate rain");
  });

  it("returns unknown for invalid code", () => {
    expect(getWeatherCodeInfo(999)).toEqual({ label: "Unknown" });
  });

  it("returns correct info for all defined codes", () => {
    const codes = [0, 1, 2, 3, 45, 48, 61, 95, 99];
    codes.forEach((code) => {
      const result = getWeatherCodeInfo(code);
      expect(result.label).toBeTruthy();
    });
  });
});
