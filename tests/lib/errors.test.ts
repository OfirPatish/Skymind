import { describe, it, expect } from "vitest";
import { WeatherApiError, getErrorMessage } from "@/lib/errors";

describe("WeatherApiError", () => {
  it("creates error with message", () => {
    const err = new WeatherApiError("Test error");
    expect(err.message).toBe("Test error");
    expect(err.name).toBe("WeatherApiError");
  });

  it("stores optional status and reason", () => {
    const err = new WeatherApiError("Failed", 500, "Server error");
    expect(err.status).toBe(500);
    expect(err.reason).toBe("Server error");
  });
});

describe("getErrorMessage", () => {
  it("returns message for WeatherApiError", () => {
    const err = new WeatherApiError("API failed");
    expect(getErrorMessage(err)).toBe("API failed");
  });

  it("returns message for standard Error", () => {
    expect(getErrorMessage(new Error("Generic error"))).toBe("Generic error");
  });

  it("returns fallback for unknown", () => {
    expect(getErrorMessage("string")).toBe("An unexpected error occurred");
    expect(getErrorMessage(null)).toBe("An unexpected error occurred");
  });
});
