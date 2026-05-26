"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  min?: string;
}

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = "DD-MM-YYYY",
  error,
  min,
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 transition-colors duration-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }`}
        />
        <Calendar
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
