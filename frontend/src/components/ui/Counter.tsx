"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export default function Counter({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
}: CounterProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium text-neutral-500">{label}</span>
      )}
      <div className="inline-flex items-center gap-0 rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="flex items-center justify-center w-8 h-8 text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Decrease"
        >
          <Minus size={14} />
        </button>
        <span className="flex items-center justify-center w-10 h-8 text-sm font-medium text-neutral-900 border-x border-neutral-200 bg-neutral-50/50">
          {value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="flex items-center justify-center w-8 h-8 text-neutral-500 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Increase"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
