"use client";

import { motion } from "motion/react";
import { MapPin, Loader2 } from "lucide-react";

type LocationButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export const LocationButton = ({
  onClick,
  isLoading = false,
  disabled = false,
}: LocationButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="btn btn-outline btn-sm sm:btn-md gap-2 min-h-11 touch-manipulation rounded-2xl"
      aria-label="Use my current location"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {isLoading ? (
        <Loader2 className="size-4 sm:size-5 animate-spin" aria-hidden />
      ) : (
        <MapPin className="size-4 sm:size-5" strokeWidth={2} aria-hidden />
      )}
      <span className="hidden sm:inline">Use my location</span>
    </motion.button>
  );
};
