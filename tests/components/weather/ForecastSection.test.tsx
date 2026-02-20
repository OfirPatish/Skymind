import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ForecastSection } from "@/components/weather/ForecastSection";

const mockWeather = {
  latitude: 51.51,
  longitude: -0.13,
  timezone: "Europe/London",
  daily: {
    time: ["2024-01-15", "2024-01-16", "2024-01-17"],
    weather_code: [0, 2, 61],
    temperature_2m_max: [10, 8, 6],
    temperature_2m_min: [4, 2, 0],
    precipitation_sum: [0, 0, 5],
  },
};

describe("ForecastSection", () => {
  it("renders section title", () => {
    render(<ForecastSection weather={mockWeather} />);
    expect(screen.getByText("7-Day Forecast")).toBeInTheDocument();
  });

  it("renders temperatures for each day", () => {
    render(<ForecastSection weather={mockWeather} />);
    expect(screen.getByText(/10°/)).toBeInTheDocument();
    expect(screen.getByText(/8°/)).toBeInTheDocument();
    expect(screen.getByText(/6°/)).toBeInTheDocument();
  });

  it("renders precipitation when present", () => {
    render(<ForecastSection weather={mockWeather} />);
    expect(screen.getByText(/5 mm/)).toBeInTheDocument();
  });

  it("returns null when no daily data", () => {
    const weatherWithoutDaily = { ...mockWeather, daily: undefined };
    const { container } = render(
      <ForecastSection weather={weatherWithoutDaily} />
    );
    expect(container.firstChild).toBeNull();
  });
});
