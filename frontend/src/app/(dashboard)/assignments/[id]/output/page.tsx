"use client";

import React, { useEffect, useRef } from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import QuestionPaper from "@/components/output/QuestionPaper";
import AnswerKey from "@/components/output/AnswerKey";
import Button from "@/components/ui/Button";
import { useAssignmentStore, useAuthStore } from "@/store/assignmentStore";

export default function AssignmentOutputPage() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;

  const {
    currentAssignment,
    generatedPaper,
    isLoading,
    error,
    fetchAssignment,
  } = useAssignmentStore();
  const { user } = useAuthStore();
  const printRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (assignmentId && (!currentAssignment || currentAssignment._id !== assignmentId)) {
      fetchAssignment(assignmentId);
    }
  }, [assignmentId, currentAssignment, fetchAssignment]);

  const paper = generatedPaper || currentAssignment?.generatedPaper;

  const handleDownloadPdf = () => {
    if (!printRef.current || !paper) return;

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
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-brand-primary" />
          <p className="text-sm text-neutral-500">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => router.push("/assignments")}
          icon={<ArrowLeft size={16} />}
        >
          Back to Assignments
        </Button>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 mb-4">
          <p className="text-sm text-neutral-600">
            No generated paper found for this assignment. The AI generation may
            have failed.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => router.push("/assignments")}
          icon={<ArrowLeft size={16} />}
        >
          Back to Assignments
        </Button>
      </div>
    );
  }

  const userName = user?.name?.split(" ")[0] || "Teacher";

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full page-enter">
    
      <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <p className="text-sm text-neutral-700 leading-relaxed">
          <span className="font-semibold">Certainly, {userName}!</span> Here are
          customized Question Paper for your {paper.className}{" "}
          {paper.subject} class on the selected chapters:
        </p>
      </div>

    
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleDownloadPdf}
          icon={<Download size={16} />}
        >
          Download as PDF
        </Button>
      </div>

   
      <QuestionPaper paper={paper} />

     
      <AnswerKey answers={paper.answerKey} />

      
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
