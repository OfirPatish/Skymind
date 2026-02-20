import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/weather/SearchBar";

vi.mock("@/lib/api/weather", () => ({
  searchLocations: vi.fn(),
}));

import { searchLocations } from "@/lib/api/weather";

describe("SearchBar", () => {
  const mockOnLocationSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    expect(
      screen.getByLabelText(/search for a city or place/i)
    ).toBeInTheDocument();
  });

  it("calls searchLocations after debounce when typing 2+ chars", async () => {
    vi.mocked(searchLocations).mockResolvedValue([]);
    const user = userEvent.setup();

    render(
      <SearchBar onLocationSelect={mockOnLocationSelect} debounceMs={0} />
    );
    const input = screen.getByLabelText(/search for a city or place/i);
    await user.type(input, "Lo");

    await waitFor(() => {
      expect(searchLocations).toHaveBeenCalledWith("Lo");
    });
  });

  it("shows results when locations returned", async () => {
    vi.mocked(searchLocations).mockResolvedValue([
      {
        name: "London",
        country: "United Kingdom",
        countryCode: "GB",
        lat: 51.51,
        lon: -0.13,
        timezone: "Europe/London",
      },
    ]);
    const user = userEvent.setup();

    render(
      <SearchBar onLocationSelect={mockOnLocationSelect} debounceMs={0} />
    );
    await user.type(
      screen.getByLabelText(/search for a city or place/i),
      "London"
    );

    expect(
      await screen.findByRole("option", { name: /London/ })
    ).toBeInTheDocument();
  });

  it("calls onLocationSelect when result clicked", async () => {
    const location = {
      name: "Paris",
      country: "France",
      countryCode: "FR",
      lat: 48.85,
      lon: 2.35,
      timezone: "Europe/Paris",
    };
    vi.mocked(searchLocations).mockResolvedValue([location]);
    const user = userEvent.setup();

    render(
      <SearchBar onLocationSelect={mockOnLocationSelect} debounceMs={0} />
    );
    await user.type(
      screen.getByLabelText(/search for a city or place/i),
      "Paris"
    );
    const option = await screen.findByRole("option", { name: /Paris/ });
    await user.click(option);

    expect(mockOnLocationSelect).toHaveBeenCalledWith(location);
  });

  it("disables input when isLoading", () => {
    render(
      <SearchBar onLocationSelect={mockOnLocationSelect} isLoading />
    );
    expect(
      screen.getByLabelText(/search for a city or place/i)
    ).toBeDisabled();
  });
});
