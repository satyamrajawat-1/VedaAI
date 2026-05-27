"use client";

import React, { useRef } from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import QuestionPaper from "@/components/output/QuestionPaper";
import AnswerKey from "@/components/output/AnswerKey";
import Button from "@/components/ui/Button";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAuthStore } from "@/store/assignmentStore";
import type { GeneratedPaper } from "@/types";

const fallbackPaper: GeneratedPaper = {
  schoolName: "Delhi Public School, Sector-4, Bokaro",
  subject: "English",
  className: "5th",
  timeAllowed: "45 minutes",
  maxMarks: 20,
  instructions: ["All questions are compulsory unless stated otherwise."],
  sections: [
    {
      title: "Section A",
      instructions:
        "Short Answer Questions — Attempt all questions. Each question carries 2 marks",
      questions: [
        {
          number: 1,
          text: "Define electroplating. Explain its purpose.",
          difficulty: "Easy",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 2,
          text: "What is the role of a conductor in the process of electrolysis?",
          difficulty: "Moderate",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 3,
          text: "Why does a solution of copper sulfate conduct electricity?",
          difficulty: "Easy",
          marks: 2,
          type: "Short Questions",
        },
      ],
    },
  ],
  answerKey: [
    {
      questionNumber: 1,
      answer:
        "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current.",
    },
    {
      questionNumber: 2,
      answer:
        "A conductor allows the flow of electric current, causing ions in the electrolyte to move.",
    },
    {
      questionNumber: 3,
      answer:
        "Copper sulfate solution contains free copper and sulfate ions which carry electric charge.",
    },
  ],
};

export default function AssignmentOutputPage() {
  const router = useRouter();
  const { generatedPaper, isLoading, currentAssignment } =
    useAssignmentStore();
  const { user } = useAuthStore();
  const printRef = useRef<HTMLDivElement>(null);

  const paper = generatedPaper || fallbackPaper;

  const handleDownloadPdf = () => {
    if (!printRef.current) return;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to download PDF.");
      return;
    }

    const content = printRef.current.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paper.subject} - Question Paper - ${paper.schoolName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Times New Roman', serif;
              color: #111;
              padding: 40px;
              line-height: 1.6;
            }
            .paper-header { text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #111; }
            .paper-header h1 { font-size: 22px; font-weight: bold; margin-bottom: 4px; }
            .paper-header p { font-size: 15px; }
            .paper-meta { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
            .paper-meta span { font-weight: bold; }
            .paper-instructions { margin-bottom: 16px; font-style: italic; font-size: 13px; }
            .student-info { margin-bottom: 24px; font-size: 14px; }
            .student-info p { margin-bottom: 4px; }
            .student-info .line { display: inline-block; width: 200px; border-bottom: 1px solid #333; }
            .section { margin-bottom: 24px; }
            .section h2 { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 8px; }
            .section .section-inst { text-align: center; font-style: italic; font-size: 13px; margin-bottom: 12px; color: #555; }
            .question { display: flex; gap: 8px; margin-bottom: 8px; font-size: 14px; }
            .question .q-num { min-width: 24px; font-weight: 500; color: #555; }
            .question .q-text { flex: 1; }
            .difficulty { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-right: 6px; }
            .difficulty-easy { background: #dcfce7; color: #166534; }
            .difficulty-moderate { background: #fef3c7; color: #92400e; }
            .difficulty-challenging { background: #fee2e2; color: #991b1b; }
            .end-marker { text-align: center; font-size: 13px; font-weight: 600; margin-top: 20px; padding-top: 12px; border-top: 1px solid #ddd; color: #555; }
            .answer-key { margin-top: 40px; page-break-before: always; }
            .answer-key h2 { font-size: 20px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #ddd; }
            .answer-item { display: flex; gap: 8px; margin-bottom: 12px; font-size: 14px; }
            .answer-item .a-num { min-width: 24px; font-weight: 500; color: #555; }
            .answer-item .a-text { flex: 1; }
            @media print {
              body { padding: 20px; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 250);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  const userName = user?.name?.split(" ")[0] || "Teacher";
  const subjectInfo = paper.subject || "your subject";

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full page-enter">
      {/* AI summary message */}
      <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <p className="text-sm text-neutral-700 leading-relaxed">
          <span className="font-semibold">Certainly, {userName}!</span> Here are
          customized Question Paper for your {paper.className}{" "}
          {subjectInfo} class on the selected chapters:
        </p>
      </div>

      {/* Download button */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleDownloadPdf}
          icon={<Download size={16} />}
        >
          Download as PDF
        </Button>
      </div>

      {/* Question Paper */}
      <QuestionPaper paper={paper} />

      {/* Answer Key */}
      <AnswerKey answers={paper.answerKey} />

      {/* Hidden print-optimized content */}
      <div ref={printRef} className="hidden">
        <div className="paper-header">
          <h1>{paper.schoolName}</h1>
          <p>Subject: {paper.subject}</p>
          <p>Class: {paper.className}</p>
        </div>

        <div className="paper-meta">
          <p>
            <span>Time Allowed:</span> {paper.timeAllowed}
          </p>
          <p>
            <span>Maximum Marks:</span> {paper.maxMarks}
          </p>
        </div>

        {paper.instructions.length > 0 && (
          <div className="paper-instructions">
            {paper.instructions.map((inst, i) => (
              <p key={i}>{inst}</p>
            ))}
          </div>
        )}

        <div className="student-info">
          <p>
            Name: <span className="line" />
          </p>
          <p>
            Roll Number: <span className="line" />
          </p>
          <p>
            Class: {paper.className} Section: <span className="line" />
          </p>
        </div>

        {paper.sections.map((section, sIndex) => (
          <div key={sIndex} className="section">
            <h2>{section.title}</h2>
            {section.instructions && (
              <p className="section-inst">{section.instructions}</p>
            )}
            {section.questions.map((q) => (
              <div key={q.number} className="question">
                <span className="q-num">{q.number}.</span>
                <div className="q-text">
                  <span
                    className={`difficulty difficulty-${q.difficulty.toLowerCase()}`}
                  >
                    {q.difficulty}
                  </span>
                  {q.text} [{q.marks} Marks]
                </div>
              </div>
            ))}
          </div>
        ))}

        <p className="end-marker">End of Question Paper</p>

        <div className="answer-key">
          <h2>Answer Key:</h2>
          {paper.answerKey.map((item) => (
            <div key={item.questionNumber} className="answer-item">
              <span className="a-num">{item.questionNumber}.</span>
              <p className="a-text">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/assignments")}
          icon={<ArrowLeft size={16} />}
        >
          Back to Assignments
        </Button>
      </div>
    </div>
  );
}
