"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2 } from "lucide-react";
import type { WeatherDisplayLocation } from "@/lib/types/weather";
import { searchLocations } from "@/lib/api/weather";

const DEFAULT_DEBOUNCE_MS = 300;

type SearchBarProps = {
  onLocationSelect: (location: WeatherDisplayLocation) => void;
  isLoading?: boolean;
  debounceMs?: number;
};

export const SearchBar = ({
  onLocationSelect,
  isLoading = false,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WeatherDisplayLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const performSearch = useCallback(async (value: string) => {
    setIsSearching(true);
    try {
      const locations = await searchLocations(value);
      setResults(locations);
      setIsOpen(locations.length > 0);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setQuery(value);
      setHighlightedIndex(-1);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (value.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      debounceRef.current = setTimeout(() => {
        performSearch(value);
      }, debounceMs);
    },
    [performSearch, debounceMs]
  );

  const handleSelect = useCallback(
    (location: WeatherDisplayLocation) => {
      onLocationSelect(location);
      const parts = [location.name];
      if (location.admin1) parts.push(location.admin1);
      parts.push(location.country);
      setQuery(parts.join(", "));
      setResults([]);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onLocationSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) {
        if (e.key === "Escape") setIsOpen(false);
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev <= 0 ? results.length - 1 : prev - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < results.length) {
            handleSelect(results[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, results, highlightedIndex, handleSelect]
  );

  return (
    <div
      className="w-full max-w-xl relative min-w-0"
      role="search"
      aria-label="City search"
    >
      <label className="input input-bordered input-lg flex items-center gap-2 sm:gap-3 w-full bg-base-200/50 border-base-300/50 focus-within:border-primary/40 transition-colors min-h-12 rounded-2xl">
        <Search className="size-5 shrink-0 text-base-content/50" strokeWidth={2} aria-hidden />
        <input
          type="search"
          role="combobox"
          placeholder="Search for a city or place..."
          className="grow text-base"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          aria-label="Search for a city or place"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={
            highlightedIndex >= 0
              ? `search-option-${highlightedIndex}`
              : undefined
          }
          disabled={isLoading}
        />
        {isSearching && (
          <Loader2
            className="size-5 shrink-0 animate-spin text-primary"
            aria-hidden
          />
        )}
      </label>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            id="search-results"
            className="menu bg-base-200 rounded-2xl mt-2 p-2 shadow-2xl border border-base-300/50 z-30 absolute top-full left-0 right-0 max-h-60 sm:max-h-72 overflow-auto overscroll-contain"
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {results.map((loc, index) => (
              <li key={`${loc.name}-${loc.lat}-${loc.lon}`}>
                <button
                  id={`search-option-${index}`}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center gap-2 sm:gap-3 py-2.5 sm:py-3 rounded-xl transition-colors touch-manipulation ${
                    index === highlightedIndex ? "bg-primary/10 text-primary" : ""
                  }`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  <span
                    className="flex size-10 items-center justify-center rounded-full bg-base-300/50 text-xs font-bold uppercase tracking-wide"
                    aria-hidden="true"
                  >
                    {loc.countryCode}
                  </span>
                  <div className="text-left min-w-0">
                    <span className="font-medium block truncate">
                      {loc.name}
                      {loc.admin1 && (
                        <span className="text-base-content/50 font-normal">
                          , {loc.admin1}
                        </span>
                      )}
                    </span>
                    <span className="text-base-content/50 text-sm block truncate">
                      {loc.country}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
