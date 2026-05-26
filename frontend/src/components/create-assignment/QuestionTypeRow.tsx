"use client";

import React from "react";
import { X } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import Counter from "@/components/ui/Counter";
import type { QuestionTypeConfig, QuestionTypeName } from "@/types";

const questionTypeOptions = [
  { label: "Multiple Choice Questions", value: "Multiple Choice Questions" },
  { label: "Short Questions", value: "Short Questions" },
  { label: "Long Questions", value: "Long Questions" },
  {
    label: "Diagram/Graph-Based Questions",
    value: "Diagram/Graph-Based Questions",
  },
  { label: "Numerical Problems", value: "Numerical Problems" },
  { label: "True/False", value: "True/False" },
  { label: "Fill in the Blanks", value: "Fill in the Blanks" },
  { label: "Match the Following", value: "Match the Following" },
];

interface QuestionTypeRowProps {
  config: QuestionTypeConfig;
  onChange: (updated: QuestionTypeConfig) => void;
  onRemove: () => void;
  usedTypes: string[];
}

export default function QuestionTypeRow({
  config,
  onChange,
  onRemove,
  usedTypes,
}: QuestionTypeRowProps) {
  
  const availableOptions = questionTypeOptions.filter(
    (opt) => !usedTypes.includes(opt.value) || opt.value === config.type
  );

  return (
    <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
      
      <div className="flex-1 w-full md:w-auto">
        <Dropdown
          options={availableOptions}
          value={config.type}
          onChange={(value) =>
            onChange({ ...config, type: value as QuestionTypeName })
          }
          placeholder="Select question type"
        />
      </div>

      
      <button
        type="button"
        onClick={onRemove}
        className="md:hidden absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
        aria-label="Remove question type"
      >
        <X size={14} className="text-neutral-400" />
      </button>

      
      <div className="flex items-end gap-3 md:gap-4">
       
        <button
          type="button"
          onClick={onRemove}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer mb-0.5"
          aria-label="Remove question type"
        >
          <X size={16} className="text-neutral-400" />
        </button>

        <Counter
          value={config.numberOfQuestions}
          onChange={(val) => onChange({ ...config, numberOfQuestions: val })}
          min={1}
          max={50}
          label="No. of Questions"
        />

        <Counter
          value={config.marksPerQuestion}
          onChange={(val) => onChange({ ...config, marksPerQuestion: val })}
          min={1}
          max={20}
          label="Marks"
        />
      </div>
    </div>
  );
}
