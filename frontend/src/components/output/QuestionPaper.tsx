"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import type { GeneratedPaper } from "@/types";

interface QuestionPaperProps {
  paper: GeneratedPaper;
}

export default function QuestionPaper({ paper }: QuestionPaperProps) {
  const difficultyVariant = (level: string) => {
    switch (level) {
      case "Easy":
        return "success";
      case "Moderate":
        return "warning";
      case "Challenging":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      
      <div className="p-6 md:p-10 lg:p-12 max-w-[800px] mx-auto">
        
        <div className="text-center mb-8 pb-6 border-b-2 border-neutral-900">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900 mb-1">
            {paper.schoolName}
          </h1>
          <p className="text-base text-neutral-700">
            Subject: {paper.subject}
          </p>
          <p className="text-base text-neutral-700">
            Class: {paper.className}
          </p>
        </div>

       
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Time Allowed:</span>{" "}
            {paper.timeAllowed}
          </p>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Maximum Marks:</span>{" "}
            {paper.maxMarks}
          </p>
        </div>

       
        {paper.instructions.length > 0 && (
          <div className="mb-6">
            {paper.instructions.map((inst, i) => (
              <p key={i} className="text-sm text-neutral-600 italic">
                {inst}
              </p>
            ))}
          </div>
        )}

       
        <div className="mb-8 space-y-2">
          <p className="text-sm text-neutral-700">
            Name: <span className="inline-block w-48 border-b border-neutral-300" />
          </p>
          <p className="text-sm text-neutral-700">
            Roll Number: <span className="inline-block w-40 border-b border-neutral-300" />
          </p>
          <p className="text-sm text-neutral-700">
            Class: {paper.className} Section: <span className="inline-block w-24 border-b border-neutral-300" />
          </p>
        </div>

       
        {paper.sections.map((section, sIndex) => (
          <div key={sIndex} className="mb-8">
            <h2 className="text-center text-lg font-bold text-neutral-900 mb-2">
              {section.title}
            </h2>
            {section.instructions && (
              <p className="text-center text-sm text-neutral-500 italic mb-4">
                {section.instructions}
              </p>
            )}

            <div className="space-y-3">
              {section.questions.map((q) => (
                <div key={q.number} className="flex gap-2">
                  <span className="text-sm font-medium text-neutral-500 w-8 flex-shrink-0 pt-0.5">
                    {q.number}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-800 leading-relaxed">
                      <Badge
                        variant={difficultyVariant(q.difficulty) as "success" | "warning" | "danger" | "default" | "info"}
                        size="sm"
                        className="mr-2"
                      >
                        {q.difficulty}
                      </Badge>
                      {q.text} [{q.marks} Marks]
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-sm font-semibold text-neutral-600 mt-6 pt-4 border-t border-neutral-200">
          End of Question Paper
        </p>
      </div>
    </div>
  );
}
