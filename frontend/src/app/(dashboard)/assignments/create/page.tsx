"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import StepProgress from "@/components/create-assignment/StepProgress";
import FileUpload from "@/components/create-assignment/FileUpload";
import DatePicker from "@/components/ui/DatePicker";
import QuestionTypeSelector from "@/components/create-assignment/QuestionTypeSelector";
import Button from "@/components/ui/Button";
import { useAssignmentStore } from "@/store/assignmentStore";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const {
    formData,
    isGenerating,
    error,
    setFormFile,
    setFormDueDate,
    setFormQuestionTypes,
    setFormAdditionalInfo,
    createAssignment,
    resetForm,
    clearError,
  } = useAssignmentStore();

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      
      const assignmentId = await createAssignment();
      if (assignmentId) {
        resetForm();
        router.push(`/assignments/output`);
      }
    }
  };

  const handlePrevious = () => {
    clearError();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      resetForm();
      router.back();
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full page-enter">
      
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
          Create Assignment
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Set up a new assignment for your students
        </p>
      </div>

     
      <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

      
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-8 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              Assignment Details
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Basic information about your assignment
            </p>
          </div>

          
          <FileUpload
            onFileSelect={(file) => setFormFile(file)}
            selectedFile={formData.file}
            onRemove={() => setFormFile(null)}
          />

         
          <DatePicker
            value={formData.dueDate}
            onChange={(val) => setFormDueDate(val)}
            label="Due Date"
            min={new Date().toISOString().split("T")[0]}
          />

         
          <QuestionTypeSelector
            questionTypes={formData.questionTypes}
            onChange={(types) => setFormQuestionTypes(types)}
          />

          
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-neutral-900">
              Additional Information (For better output)
            </h3>
            <div className="relative">
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormAdditionalInfo(e.target.value)}
                placeholder="e.g. Generate a question paper for 3 hour exam duration..."
                rows={3}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 resize-none transition-colors duration-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
              />
              <Sparkles
                size={16}
                className="absolute bottom-3 right-3 text-neutral-300"
              />
            </div>
          </div>
        </div>
      )}

      
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-8 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              Review & Generate
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Review your configuration and generate the question paper
            </p>
          </div>

         
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">
                Uploaded Material
              </h4>
              <p className="text-sm text-neutral-900">
                {formData.file ? formData.file.name : "No file uploaded"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">
                Due Date
              </h4>
              <p className="text-sm text-neutral-900">
                {formData.dueDate || "Not set"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <h4 className="text-sm font-medium text-neutral-500 mb-3">
                Question Types
              </h4>
              <div className="space-y-2">
                {formData.questionTypes.map((qt) => (
                  <div
                    key={qt.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-neutral-700">{qt.type}</span>
                    <span className="text-neutral-500">
                      {qt.numberOfQuestions} questions × {qt.marksPerQuestion}{" "}
                      marks
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-3 pt-3 border-t border-neutral-200">
                <span className="text-sm font-semibold text-neutral-900">
                  Total:{" "}
                  {formData.questionTypes.reduce(
                    (s, q) => s + q.numberOfQuestions,
                    0
                  )}{" "}
                  questions,{" "}
                  {formData.questionTypes.reduce(
                    (s, q) => s + q.numberOfQuestions * q.marksPerQuestion,
                    0
                  )}{" "}
                  marks
                </span>
              </div>
            </div>

            {formData.additionalInfo && (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="text-sm font-medium text-neutral-500 mb-2">
                  Additional Instructions
                </h4>
                <p className="text-sm text-neutral-900">
                  {formData.additionalInfo}
                </p>
              </div>
            )}
          </div>

         
          {isGenerating && (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2
                size={32}
                className="animate-spin text-brand-primary"
              />
              <p className="text-sm text-neutral-600">
                Generating your question paper with AI...
              </p>
              <p className="text-xs text-neutral-400">
                This may take up to a minute
              </p>
            </div>
          )}
        </div>
      )}

     
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isGenerating}
          icon={<ArrowLeft size={16} />}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={isGenerating}
          icon={
            isGenerating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )
          }
          iconPosition="right"
        >
          {isGenerating
            ? "Generating..."
            : currentStep === totalSteps
              ? "Generate"
              : "Next"}
        </Button>
      </div>
    </div>
  );
}
