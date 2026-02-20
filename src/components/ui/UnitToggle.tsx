"use client";

import { motion } from "motion/react";
import type { TemperatureUnit } from "@/lib/types/weather";

type UnitToggleProps = {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  disabled?: boolean;
};

export const UnitToggle = ({
  unit,
  onUnitChange,
  disabled = false,
}: UnitToggleProps) => {
  return (
    <div
      className="join rounded-2xl overflow-hidden"
      role="group"
      aria-label="Temperature unit"
    >
      <motion.button
        type="button"
        onClick={() => onUnitChange("celsius")}
        disabled={disabled}
        className={`join-item btn btn-sm rounded-l-2xl ${
          unit === "celsius" ? "btn-primary" : "btn-ghost"
        }`}
        aria-pressed={unit === "celsius"}
      >
        °C
      </motion.button>
      <motion.button
        type="button"
        onClick={() => onUnitChange("fahrenheit")}
        disabled={disabled}
        className={`join-item btn btn-sm rounded-r-2xl ${
          unit === "fahrenheit" ? "btn-primary" : "btn-ghost"
        }`}
        aria-pressed={unit === "fahrenheit"}
      >
        °F
      </motion.button>
    </div>
  );
};
