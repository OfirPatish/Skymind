import { describe, it, expect, vi, beforeEach } from "vitest";
import { STORAGE_KEYS } from "@/lib/constants";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

vi.mock("@/lib/api/weather", () => ({
  fetchWeather: vi.fn(),
  fetchAirQuality: vi.fn().mockResolvedValue(null),
  reverseGeocode: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/components/weather", () => ({
  LocationButton: () => <button type="button">Use location</button>,
  HourlyForecast: () => <div data-testid="hourly-forecast" />,
  AirQuality: () => null,
  ShareButton: () => null,
  FavoriteButton: () => null,
  FavoritesBar: () => null,
  SearchBar: ({
    onLocationSelect,
  }: {
    onLocationSelect: (loc: { name: string; country: string }) => void;
  }) => (
    <div>
      <input data-testid="search" aria-label="Search" />
      <button
        type="button"
        onClick={() =>
          onLocationSelect({
            name: "London",
            country: "UK",
            countryCode: "GB",
            lat: 51.51,
            lon: -0.13,
            timezone: "Europe/London",
          })
        }
      >
        Select London
      </button>
    </div>
  ),
  WeatherCard: () => <div data-testid="weather-card">Weather</div>,
  ForecastSection: () => <div data-testid="forecast">Forecast</div>,
}));

import { fetchWeather } from "@/lib/api/weather";

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.CACHED_WEATHER);
    }
  });

  it("renders header", () => {
    render(<Home />);
    expect(screen.getByText("Skymind")).toBeInTheDocument();
    expect(screen.getByText(/Weather Forecast/i)).toBeInTheDocument();
  });

  it("shows empty state when no location selected", () => {
    render(<Home />);
    expect(screen.getByText(/Search for a city to see the forecast/)).toBeInTheDocument();
  });

  it("shows weather when location selected and fetch succeeds", async () => {
    vi.mocked(fetchWeather).mockResolvedValue({
      latitude: 51.51,
      longitude: -0.13,
      timezone: "Europe/London",
      current: {
        time: "2024-01-15T12:00",
        temperature_2m: 8,
        relative_humidity_2m: 75,
        apparent_temperature: 6,
        weather_code: 0,
        wind_speed_10m: 12,
        wind_direction_10m: 180,
      },
      daily: {
        time: ["2024-01-15"],
        weather_code: [0],
        temperature_2m_max: [10],
        temperature_2m_min: [4],
        precipitation_sum: [0],
      },
    });
    const user = userEvent.setup();

    render(<Home />);
    const btn = screen.getByRole("button", { name: /select london/i });
    await user.click(btn);

    expect(await screen.findByTestId("weather-card")).toBeInTheDocument();
    expect(screen.getByTestId("hourly-forecast")).toBeInTheDocument();
    expect(screen.getByTestId("forecast")).toBeInTheDocument();
  });

  it("shows error when fetch fails", async () => {
    vi.mocked(fetchWeather).mockRejectedValue(new Error("Network error"));
    const user = userEvent.setup();

    render(<Home />);
    const btn = screen.getByRole("button", { name: /select london/i });
    await user.click(btn);

    expect(
      await screen.findByText(/Unable to load weather|Network error|An unexpected/i)
    ).toBeInTheDocument();
  });
});
