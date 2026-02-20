"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { WeatherDisplayLocation } from "@/lib/types/weather";

type FavoriteButtonProps = {
  location: WeatherDisplayLocation;
  isFavorite: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export const getFavoriteKey = (loc: WeatherDisplayLocation) => `${loc.lat},${loc.lon}`;

export const FavoriteButton = ({
  isFavorite,
  onToggle,
  disabled = false,
}: FavoriteButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="btn btn-ghost btn-sm btn-square rounded-2xl"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`size-5 transition-colors ${
          isFavorite ? "fill-error text-error" : "text-base-content/40"
        }`}
        strokeWidth={2}
        aria-hidden
      />
    </motion.button>
  );
};
