import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WeatherCard } from "@/components/weather/WeatherCard";

const mockLocation = {
  name: "London",
  country: "United Kingdom",
  countryCode: "GB",
  lat: 51.51,
  lon: -0.13,
  timezone: "Europe/London",
};

const mockWeather = {
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
};

describe("WeatherCard", () => {
  it("renders location name and country", () => {
    render(<WeatherCard weather={mockWeather} location={mockLocation} />);
    expect(screen.getByText(/London, United Kingdom/)).toBeInTheDocument();
  });

  it("renders temperature", () => {
    render(<WeatherCard weather={mockWeather} location={mockLocation} />);
    const tempElement = screen.getByText((_, el) => (el?.textContent ?? "") === "8°");
    expect(tempElement).toBeInTheDocument();
  });

  it("renders feels like temperature", () => {
    render(<WeatherCard weather={mockWeather} location={mockLocation} />);
    expect(screen.getByText(/Feels like 6/)).toBeInTheDocument();
  });

  it("renders humidity and wind stats", () => {
    render(<WeatherCard weather={mockWeather} location={mockLocation} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("returns null when no current weather", () => {
    const weatherWithoutCurrent = { ...mockWeather, current: undefined };
    const { container } = render(
      <WeatherCard weather={weatherWithoutCurrent} location={mockLocation} />
    );
    expect(container.firstChild).toBeNull();
  });
});
