"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, CircleAlert } from "lucide-react";
import {
  ThemeToggle,
  UnitToggle,
  type ThemeMode,
} from "@/components/ui";
import {
  SearchBar,
  WeatherCard,
  ForecastSection,
  HourlyForecast,
  LocationButton,
  AirQuality,
  ShareButton,
  FavoriteButton,
  FavoritesBar,
  getFavoriteKey,
} from "@/components/weather";
import { fetchWeather, fetchAirQuality, reverseGeocode } from "@/lib/api/weather";
import { getErrorMessage } from "@/lib/errors";
import { STORAGE_KEYS } from "@/lib/constants";
import type {
  WeatherDisplayLocation,
  WeatherForecastResponse,
  TemperatureUnit,
} from "@/lib/types/weather";
import type { AirQualityResponse } from "@/lib/api/weather";

const SUGGESTED_CITIES: WeatherDisplayLocation[] = [
  { name: "London", country: "United Kingdom", countryCode: "GB", lat: 51.5074, lon: -0.1278, timezone: "Europe/London" },
  { name: "Tokyo", country: "Japan", countryCode: "JP", lat: 35.6762, lon: 139.6503, timezone: "Asia/Tokyo" },
  { name: "New York", country: "United States", countryCode: "US", lat: 40.7128, lon: -74.006, timezone: "America/New_York" },
  { name: "Paris", country: "France", countryCode: "FR", lat: 48.8566, lon: 2.3522, timezone: "Europe/Paris" },
  { name: "Sydney", country: "Australia", countryCode: "AU", lat: -33.8688, lon: 151.2093, timezone: "Australia/Sydney" },
];

type CachedWeather = {
  location: WeatherDisplayLocation;
  weather: WeatherForecastResponse;
  timestamp: number;
};

const getStoredUnit = (): TemperatureUnit => {
  if (typeof window === "undefined") return "celsius";
  const stored = localStorage.getItem(STORAGE_KEYS.TEMP_UNIT);
  return stored === "fahrenheit" ? "fahrenheit" : "celsius";
};

const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  return stored === "dark" ? "dark" : "light";
};

const loadFavorites = (): WeatherDisplayLocation[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: WeatherDisplayLocation[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
};

const loadCached = (): CachedWeather | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CACHED_WEATHER);
    if (!raw) return null;
    return JSON.parse(raw) as CachedWeather;
  } catch {
    return null;
  }
};

const saveCached = (location: WeatherDisplayLocation, weather: WeatherForecastResponse) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEYS.CACHED_WEATHER,
      JSON.stringify({ location, weather, timestamp: Date.now() })
    );
  }
};

export default function Home() {
  const [location, setLocation] = useState<WeatherDisplayLocation | null>(null);
  const [weather, setWeather] = useState<WeatherForecastResponse | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [favorites, setFavorites] = useState<WeatherDisplayLocation[]>([]);
  const [isCached, setIsCached] = useState(false);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    setUnit(getStoredUnit());
    setTheme(getStoredTheme());
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }, [theme]);

  const persistUnit = useCallback((u: TemperatureUnit) => {
    setUnit(u);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TEMP_UNIT, u);
    }
  }, []);

  const loadWeather = useCallback(
    async (loc: WeatherDisplayLocation, tempUnit: TemperatureUnit = unit) => {
      setLocation(loc);
      setError(null);
      setIsLoading(true);
      setIsCached(false);
      setAirQuality(null);
      try {
        const data = await fetchWeather(loc.lat, loc.lon, loc.timezone, tempUnit);
        setWeather(data);
        saveCached(loc, data);
        const aq = await fetchAirQuality(loc.lat, loc.lon);
        setAirQuality(aq);
      } catch (err) {
        const cached = loadCached();
        if (cached && cached.location.lat === loc.lat && cached.location.lon === loc.lon) {
          setWeather(cached.weather);
          setLocation(cached.location);
          setIsCached(true);
        } else {
          setError(getErrorMessage(err));
          setWeather(null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [unit]
  );

  const handleLocationSelect = useCallback(
    (loc: WeatherDisplayLocation) => loadWeather(loc),
    [loadWeather]
  );

  useEffect(() => {
    if (initialLoadDone.current) return;
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");
    const tz = params.get("tz");

    if (lat && lon && tz && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
      initialLoadDone.current = true;
      const loc: WeatherDisplayLocation = {
        name: "Shared Location",
        country: "",
        countryCode: "",
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        timezone: tz,
      };
      loadWeather(loc);
    } else if (!navigator.onLine) {
      const cached = loadCached();
      if (cached) {
        initialLoadDone.current = true;
        setLocation(cached.location);
        setWeather(cached.weather);
        setAirQuality(null);
        setIsCached(true);
      }
    }
  }, [loadWeather]);

  const handleUnitChange = useCallback(
    (u: TemperatureUnit) => {
      persistUnit(u);
      if (location) loadWeather(location, u);
    },
    [persistUnit, location, loadWeather]
  );

  const handleThemeChange = useCallback((t: ThemeMode) => {
    setTheme(t);
  }, []);

  const handleGeolocation = useCallback(async () => {
    if (!navigator?.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setError(null);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });
      const { latitude, longitude } = pos.coords;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const reverse = await reverseGeocode(
        latitude,
        longitude,
        typeof navigator !== "undefined" ? navigator.language : undefined
      );
      const loc: WeatherDisplayLocation = reverse
        ? { ...reverse, lat: latitude, lon: longitude, timezone }
        : {
            name: "Current Location",
            country: "",
            countryCode: "",
            lat: latitude,
            lon: longitude,
            timezone,
          };
      await loadWeather(loc);
    } catch (err) {
      const geolocationError = err as { code?: number };
      const msg =
        typeof geolocationError?.code === "number"
          ? geolocationError.code === 1
            ? "Location access denied."
            : geolocationError.code === 2
              ? "Location unavailable."
              : "Location request timed out."
          : getErrorMessage(err);
      setError(msg);
    } finally {
      setIsLocating(false);
    }
  }, [loadWeather]);

  const toggleFavorite = useCallback((loc: WeatherDisplayLocation) => {
    setFavorites((prev) => {
      const key = getFavoriteKey(loc);
      const exists = prev.some((f) => getFavoriteKey(f) === key);
      const next = exists
        ? prev.filter((f) => getFavoriteKey(f) !== key)
        : [...prev, loc];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = location ? favorites.some((f) => getFavoriteKey(f) === getFavoriteKey(location)) : false;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-base-100 overflow-x-hidden">
      <nav className="sticky top-0 z-20 py-2 px-3 sm:px-4">
        <div className="navbar bg-base-200/60 backdrop-blur-md border border-base-300/30 rounded-2xl shadow-sm max-w-4xl mx-auto min-h-12 px-3 sm:px-4">
          <div className="navbar-start">
            <div className="flex items-center gap-2.5">
              <Cloud className="size-6 text-primary" strokeWidth={2} aria-hidden />
              <span className="text-lg font-bold tracking-tight">Skymind</span>
            </div>
          </div>
          <div className="navbar-center" />
          <div className="navbar-end gap-1">
          <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
          <UnitToggle unit={unit} onUnitChange={handleUnitChange} disabled={isLoading} />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12 max-w-3xl">
        <section className="text-center mb-6 sm:mb-8 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2 break-words">
            Weather Forecast
          </h2>
          <p className="text-base-content/50 text-sm sm:text-base mb-6">
            Search any city worldwide for current conditions and 7-day forecast
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="w-full max-w-xl">
              <SearchBar onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            </div>
            <LocationButton onClick={handleGeolocation} isLoading={isLocating} disabled={isLoading} />
          </div>
          <div className="mt-4">
            <FavoritesBar
              favorites={favorites}
              onSelect={handleLocationSelect}
              onRemove={toggleFavorite}
              isLoading={isLoading}
            />
          </div>
        </section>

        <AnimatePresence>
          {error && (
            <motion.div
              className="alert alert-error shadow-lg mb-6 rounded-2xl"
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CircleAlert className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              <span>{error}</span>
            </motion.div>
          )}

          {isCached && location && (
            <motion.div
              className="alert alert-warning mb-4 rounded-2xl"
              role="status"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span>Showing cached data — you appear to be offline.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {(isLoading || isLocating) && (
          <div className="flex flex-col items-center py-20 gap-4" aria-label="Loading weather">
            <span className="loading loading-dots loading-lg text-primary" />
            <p className="text-base-content/50 text-sm">{isLocating ? "Getting location..." : "Fetching forecast..."}</p>
          </div>
        )}

        {!isLoading && !isLocating && location && weather && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <div className="flex justify-end gap-2 mb-2">
                <FavoriteButton
                  location={location}
                  isFavorite={isFavorite}
                  onToggle={() => toggleFavorite(location)}
                  disabled={isLoading}
                />
                <ShareButton location={location} disabled={isLoading} />
              </div>
              <WeatherCard weather={weather} location={location} unit={unit} />
            </div>
            <AirQuality data={airQuality} />
            <HourlyForecast weather={weather} />
            <ForecastSection weather={weather} />
          </motion.div>
        )}

        {!isLoading && !isLocating && !location && (
          <motion.div
            className="flex flex-col items-center py-16 sm:py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Cloud className="text-6xl sm:text-7xl mb-6 opacity-30" strokeWidth={1.5} aria-hidden />
            <p className="text-base-content/60 text-lg mb-2">Search for a city to see the forecast</p>
            <p className="text-base-content/40 text-sm mb-8">or try one of these popular cities</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Suggested cities">
              {SUGGESTED_CITIES.map((city, i) => (
                <motion.button
                  key={city.name}
                  type="button"
                  onClick={() => handleLocationSelect(city)}
                  className="btn btn-sm btn-outline btn-primary min-h-11 touch-manipulation rounded-2xl"
                  aria-label={`View weather for ${city.name}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {city.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <footer className="mt-16 py-8 border-t border-base-300/30 text-center rounded-t-2xl space-y-2">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/about" className="link link-hover text-base-content/60 text-sm">
              About
            </Link>
            <Link href="/privacy" className="link link-hover text-base-content/60 text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="link link-hover text-base-content/60 text-sm">
              Terms
            </Link>
          </nav>
          <p className="text-base-content/40 text-xs sm:text-sm">
            Powered by{" "}
            <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="link link-hover link-primary">
              Open-Meteo
            </a>
            {" · "}
            <a href="https://nominatim.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="link link-hover link-primary">
              Nominatim
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
