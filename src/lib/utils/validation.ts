export const SEARCH_MIN_LENGTH = 2;
export const SEARCH_MAX_LENGTH = 100;

export const validateSearchQuery = (query: string): { valid: boolean; error?: string } => {
  const trimmed = query.trim();
  if (!trimmed) return { valid: false, error: "Search cannot be empty" };
  if (trimmed.length < SEARCH_MIN_LENGTH)
    return { valid: false, error: `Enter at least ${SEARCH_MIN_LENGTH} characters` };
  if (trimmed.length > SEARCH_MAX_LENGTH)
    return { valid: false, error: `Search must be under ${SEARCH_MAX_LENGTH} characters` };
  return { valid: true };
};

const LAT_MIN = -90;
const LAT_MAX = 90;
const LON_MIN = -180;
const LON_MAX = 180;

export const validateCoordinates = (
  lat: number,
  lon: number
): { valid: boolean; error?: string } => {
  if (typeof lat !== "number" || Number.isNaN(lat))
    return { valid: false, error: "Invalid latitude" };
  if (typeof lon !== "number" || Number.isNaN(lon))
    return { valid: false, error: "Invalid longitude" };
  if (lat < LAT_MIN || lat > LAT_MAX)
    return { valid: false, error: "Latitude must be between -90 and 90" };
  if (lon < LON_MIN || lon > LON_MAX)
    return { valid: false, error: "Longitude must be between -180 and 180" };
  return { valid: true };
};

export const validateTimezone = (tz: string): { valid: boolean; error?: string } => {
  if (!tz || typeof tz !== "string") return { valid: false, error: "Timezone is required" };
  if (tz.trim().length === 0) return { valid: false, error: "Timezone cannot be empty" };
  return { valid: true };
};
