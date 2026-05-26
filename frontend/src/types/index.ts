export type QuestionTypeName =
  | "Multiple Choice Questions"
  | "Short Questions"
  | "Long Questions"
  | "Diagram/Graph-Based Questions"
  | "Numerical Problems"
  | "True/False"
  | "Fill in the Blanks"
  | "Match the Following";

export interface QuestionTypeConfig {
  id: string;
  type: QuestionTypeName;
  numberOfQuestions: number;
  marksPerQuestion: number;
}

export type AssignmentStatus = "draft" | "assigned" | "completed" | "overdue";

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  subject?: string;
  className?: string;
  schoolName?: string;
  assignedOn: string;
  dueDate: string;
  status: AssignmentStatus;
  questionTypes: QuestionTypeConfig[];
  totalQuestions: number;
  totalMarks: number;
  materialUrl?: string;
  generatedPaper?: GeneratedPaper;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type DifficultyLevel = "Easy" | "Moderate" | "Challenging";

export interface Question {
  number: number;
  text: string;
  difficulty: DifficultyLevel;
  marks: number;
  type: QuestionTypeName;
}

export interface Section {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface GeneratedPaper {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  instructions: string[];
  sections: Section[];
  answerKey: AnswerKeyItem[];
}

export interface AnswerKeyItem {
  questionNumber: number;
  answer: string;
}