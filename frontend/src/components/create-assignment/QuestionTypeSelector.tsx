"use client";

import React from "react";
import { Plus } from "lucide-react";
import QuestionTypeRow from "./QuestionTypeRow";
import type { QuestionTypeConfig } from "@/types";
import { generateId } from "@/lib/utils";

interface QuestionTypeSelectorProps {
  questionTypes: QuestionTypeConfig[];
  onChange: (types: QuestionTypeConfig[]) => void;
}

export default function QuestionTypeSelector({
  questionTypes,
  onChange,
}: QuestionTypeSelectorProps) {
  const totalQuestions = questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions,
    0
  );
  const totalMarks = questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions * qt.marksPerQuestion,
    0
  );

  const usedTypes = questionTypes.map((qt) => qt.type);

  const addQuestionType = () => {
    onChange([
      ...questionTypes,
      {
        id: generateId(),
        type: "Multiple Choice Questions",
        numberOfQuestions: 4,
        marksPerQuestion: 1,
      },
    ]);
  };

  const updateQuestionType = (index: number, updated: QuestionTypeConfig) => {
    const newTypes = [...questionTypes];
    newTypes[index] = updated;
    onChange(newTypes);
  };

  const removeQuestionType = (index: number) => {
    onChange(questionTypes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-neutral-900">Question Type</h3>

      
      <div className="space-y-3">
        {questionTypes.map((qt, index) => (
          <QuestionTypeRow
            key={qt.id}
            config={qt}
            onChange={(updated) => updateQuestionType(index, updated)}
            onRemove={() => removeQuestionType(index)}
            usedTypes={usedTypes}
          />
        ))}
      </div>

      
      <button
        type="button"
        onClick={addQuestionType}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white">
          <Plus size={14} />
        </div>
        Add Question Type
      </button>

     
      <div className="flex justify-end gap-6 pt-2 border-t border-neutral-100">
        <span className="text-sm text-neutral-600">
          Total Questions :{" "}
          <span className="font-semibold text-neutral-900">
            {totalQuestions}
          </span>
        </span>
        <span className="text-sm text-neutral-600">
          Total Marks :{" "}
          <span className="font-semibold text-neutral-900">{totalMarks}</span>
        </span>
      </div>
    </div>
  );
}
