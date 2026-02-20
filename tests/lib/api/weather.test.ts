import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchLocations, fetchWeather, reverseGeocode } from "@/lib/api/weather";
import { WeatherApiError } from "@/lib/errors";

describe("searchLocations", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns empty array for query shorter than 2 chars", async () => {
    const result = await searchLocations("a");
    expect(result).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns empty array for empty query", async () => {
    const result = await searchLocations("");
    expect(result).toEqual([]);
  });

  it("returns mapped locations on success", async () => {
    const mockResults = [
      {
        id: 1,
        name: "Berlin",
        latitude: 52.52,
        longitude: 13.41,
        timezone: "Europe/Berlin",
        country_code: "DE",
        country: "Germany",
      },
    ];

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockResults }),
    });

    const result = await searchLocations("Berlin");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: "Berlin",
      country: "Germany",
      countryCode: "DE",
      lat: 52.52,
      lon: 13.41,
      timezone: "Europe/Berlin",
    });
  });

  it("returns empty array when no results", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await searchLocations("xyznonexistent");
    expect(result).toEqual([]);
  });

  it("throws WeatherApiError on API error response", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: true, reason: "Server error" }),
    });

    await expect(searchLocations("London")).rejects.toThrow(WeatherApiError);
  });
});

describe("fetchWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("throws for invalid coordinates", async () => {
    await expect(
      fetchWeather(999, 0, "Europe/London")
    ).rejects.toThrow(WeatherApiError);

    await expect(
      fetchWeather(0, 999, "Europe/London")
    ).rejects.toThrow(WeatherApiError);
  });

  it("throws for invalid timezone", async () => {
    await expect(fetchWeather(52, 13, "")).rejects.toThrow(WeatherApiError);
  });

  it("returns weather data on success", async () => {
    const mockData = {
      latitude: 52.52,
      longitude: 13.41,
      timezone: "Europe/Berlin",
      current: {
        time: "2024-01-15T12:00",
        temperature_2m: 5,
        relative_humidity_2m: 80,
        apparent_temperature: 3,
        weather_code: 0,
        wind_speed_10m: 15,
        wind_direction_10m: 180,
      },
      daily: {
        time: ["2024-01-15"],
        weather_code: [0],
        temperature_2m_max: [6],
        temperature_2m_min: [2],
        precipitation_sum: [0],
      },
    };

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchWeather(52.52, 13.41, "Europe/Berlin");
    expect(result).toEqual(mockData);
  });

  it("throws WeatherApiError on API error", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: true, reason: "Invalid request" }),
    });

    await expect(
      fetchWeather(52, 13, "Europe/Berlin")
    ).rejects.toThrow(WeatherApiError);
  });
});

describe("reverseGeocode", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns parsed location when API succeeds", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: "Haifa",
          country: "Israel",
          countryCode: "IL",
          admin1: "Haifa",
        }),
    });

    const result = await reverseGeocode(32.8, 35);
    expect(result).toEqual({
      name: "Haifa",
      country: "Israel",
      countryCode: "IL",
      admin1: "Haifa",
    });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/reverse-geocode?lat=32.8&lon=35")
    );
  });

  it("returns null when API returns non-ok", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false });
    const result = await reverseGeocode(32.8, 35);
    expect(result).toBeNull();
  });

  it("returns null when response has no name", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    const result = await reverseGeocode(32.8, 35);
    expect(result).toBeNull();
  });
});
