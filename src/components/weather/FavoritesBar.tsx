"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import type { WeatherDisplayLocation } from "@/lib/types/weather";

type FavoritesBarProps = {
  favorites: WeatherDisplayLocation[];
  onSelect: (loc: WeatherDisplayLocation) => void;
  onRemove: (loc: WeatherDisplayLocation) => void;
  isLoading?: boolean;
};

const locToKey = (loc: WeatherDisplayLocation) => `${loc.lat},${loc.lon}`;

export const FavoritesBar = ({
  favorites,
  onSelect,
  onRemove,
}: FavoritesBarProps) => {
  if (favorites.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Favorite locations">
      {favorites.map((loc) => (
        <motion.div
          key={locToKey(loc)}
          className="badge badge-lg gap-1 pr-1 py-3 cursor-pointer hover:badge-primary/20 transition-colors rounded-2xl"
          role="button"
          tabIndex={0}
          onClick={() => onSelect(loc)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(loc);
            }
            if (e.key === "Delete" || e.key === "Backspace") {
              e.preventDefault();
              onRemove(loc);
            }
          }}
          aria-label={`${loc.name}, ${loc.country}. Press Delete to remove.`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="truncate max-w-[120px]">
            {loc.name}{loc.country ? `, ${loc.country}` : ""}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(loc);
            }}
            className="btn btn-ghost btn-xs btn-circle rounded-full hover:bg-base-content/10"
            aria-label={`Remove ${loc.name} from favorites`}
          >
            <X className="size-3" strokeWidth={2.5} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};
