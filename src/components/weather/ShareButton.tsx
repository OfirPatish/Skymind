"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Share2, Check } from "lucide-react";
import type { WeatherDisplayLocation } from "@/lib/types/weather";

type ShareButtonProps = {
  location: WeatherDisplayLocation;
  disabled?: boolean;
};

export const ShareButton = ({ location, disabled = false }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const params = new URLSearchParams({
      lat: location.lat.toString(),
      lon: location.lon.toString(),
      tz: location.timezone,
    });
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/?${params}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [location]);

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      disabled={disabled}
      className="btn btn-ghost btn-sm gap-2 rounded-2xl"
      aria-label={copied ? "Link copied" : "Copy share link"}
    >
      {copied ? (
        <Check className="size-4 text-success" strokeWidth={2.5} aria-hidden />
      ) : (
        <Share2 className="size-4 text-base-content/70" strokeWidth={2} aria-hidden />
      )}
      {copied ? "Copied" : "Share"}
    </motion.button>
  );
};
