"use client";

import React from "react";
import type { AnswerKeyItem } from "@/types";

interface AnswerKeyProps {
  answers: AnswerKeyItem[];
}

export default function AnswerKey({ answers }: AnswerKeyProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mt-6">
      <div className="p-6 md:p-10 lg:p-12 max-w-[800px] mx-auto">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-200">
          Answer Key:
        </h2>

        <div className="space-y-4">
          {answers.map((item) => (
            <div key={item.questionNumber} className="flex gap-2">
              <span className="text-sm font-medium text-neutral-500 w-8 flex-shrink-0 pt-0.5">
                {item.questionNumber}.
              </span>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
