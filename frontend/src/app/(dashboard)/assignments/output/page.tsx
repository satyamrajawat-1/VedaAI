"use client";

import React from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import QuestionPaper from "@/components/output/QuestionPaper";
import AnswerKey from "@/components/output/AnswerKey";
import Button from "@/components/ui/Button";
import { useAssignmentStore } from "@/store/assignmentStore";
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
        {
          number: 4,
          text: "Describe one example of the chemical effect of electric current in daily life.",
          difficulty: "Moderate",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 5,
          text: "Explain why electric current is said to have chemical effects.",
          difficulty: "Moderate",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 6,
          text: "How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.",
          difficulty: "Challenging",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 7,
          text: "What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.",
          difficulty: "Challenging",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 8,
          text: "Mention the type of current used in electroplating and justify why it is used.",
          difficulty: "Easy",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 9,
          text: "What is the importance of electric current in the field of metallurgy?",
          difficulty: "Moderate",
          marks: 2,
          type: "Short Questions",
        },
        {
          number: 10,
          text: "Explain with a chemical equation how copper is deposited during the electroplating of an object.",
          difficulty: "Challenging",
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
        "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.",
    },
    {
      questionNumber: 2,
      answer:
        "A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.",
    },
    {
      questionNumber: 3,
      answer:
        "Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.",
    },
    {
      questionNumber: 4,
      answer:
        "An example is the electroplating of silver on jewelry to prevent tarnishing.",
    },
    {
      questionNumber: 5,
      answer:
        "Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.",
    },
    {
      questionNumber: 6,
      answer:
        "Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons: 2H2O + 2e⁻ → H2 + 2OH⁻, Na⁺ + OH⁻ → NaOH (in solution)",
    },
    {
      questionNumber: 7,
      answer:
        "At the cathode, water is reduced to hydrogen gas and hydroxide ions. At the anode, water is oxidized to oxygen gas and hydrogen ions.",
    },
  ],
};

export default function AssignmentOutputPage() {
  const router = useRouter();
  const { generatedPaper, isLoading } = useAssignmentStore();

  
  const paper = generatedPaper || fallbackPaper;

  const handleDownloadPdf = () => {
    
    alert("PDF download will be implemented in Phase 4!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full page-enter">
     
      <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <p className="text-sm text-neutral-700 leading-relaxed">
          <span className="font-semibold">Certainly, Lakshya!</span> Here are
          customized Question Paper for your CBSE Grade 8 Science classes on the
          NCERT chapters:
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
