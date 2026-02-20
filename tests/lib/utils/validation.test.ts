import { describe, it, expect } from "vitest";
import {
  validateSearchQuery,
  validateCoordinates,
  validateTimezone,
  SEARCH_MIN_LENGTH,
  SEARCH_MAX_LENGTH,
} from "@/lib/utils/validation";

describe("validateSearchQuery", () => {
  it("rejects empty string", () => {
    expect(validateSearchQuery("").valid).toBe(false);
    expect(validateSearchQuery("   ").valid).toBe(false);
  });

  it("rejects string shorter than min", () => {
    expect(validateSearchQuery("a").valid).toBe(false);
    expect(validateSearchQuery("a").error).toContain(SEARCH_MIN_LENGTH.toString());
  });

  it("accepts string at min length", () => {
    expect(validateSearchQuery("ab").valid).toBe(true);
  });

  it("accepts valid query", () => {
    expect(validateSearchQuery("London").valid).toBe(true);
  });

  it("rejects string longer than max", () => {
    const long = "a".repeat(SEARCH_MAX_LENGTH + 1);
    expect(validateSearchQuery(long).valid).toBe(false);
  });
});

describe("validateCoordinates", () => {
  it("accepts valid coordinates", () => {
    expect(validateCoordinates(52.52, 13.41).valid).toBe(true);
    expect(validateCoordinates(-90, -180).valid).toBe(true);
    expect(validateCoordinates(90, 180).valid).toBe(true);
  });

  it("rejects invalid latitude", () => {
    expect(validateCoordinates(91, 0).valid).toBe(false);
    expect(validateCoordinates(-91, 0).valid).toBe(false);
    expect(validateCoordinates(NaN, 0).valid).toBe(false);
  });

  it("rejects invalid longitude", () => {
    expect(validateCoordinates(0, 181).valid).toBe(false);
    expect(validateCoordinates(0, -181).valid).toBe(false);
    expect(validateCoordinates(0, NaN).valid).toBe(false);
  });
});

describe("validateTimezone", () => {
  it("accepts valid timezone", () => {
    expect(validateTimezone("Europe/London").valid).toBe(true);
  });

  it("rejects empty timezone", () => {
    expect(validateTimezone("").valid).toBe(false);
    expect(validateTimezone("   ").valid).toBe(false);
  });

  it("rejects non-string", () => {
    expect(validateTimezone(null as unknown as string).valid).toBe(false);
  });
});
