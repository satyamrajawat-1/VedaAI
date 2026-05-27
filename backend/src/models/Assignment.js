import mongoose from "mongoose";

const questionTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Multiple Choice Questions",
        "Short Questions",
        "Long Questions",
        "Diagram/Graph-Based Questions",
        "Numerical Problems",
        "True/False",
        "Fill in the Blanks",
        "Match the Following",
      ],
    },
    numberOfQuestions: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    marksPerQuestion: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    number: Number,
    text: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging"],
    },
    marks: Number,
    type: String,
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: String,
    instructions: String,
    questions: [questionSchema],
  },
  { _id: false }
);

const answerKeyItemSchema = new mongoose.Schema(
  {
    questionNumber: Number,
    answer: String,
  },
  { _id: false }
);

const generatedPaperSchema = new mongoose.Schema(
  {
    schoolName: String,
    subject: String,
    className: String,
    timeAllowed: String,
    maxMarks: Number,
    instructions: [String],
    sections: [sectionSchema],
    answerKey: [answerKeyItemSchema],
  },
  { _id: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      default: "Untitled Assignment",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    subject: {
      type: String,
      trim: true,
    },
    className: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    assignedOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["draft", "assigned", "completed", "overdue"],
      default: "assigned",
    },
    questionTypes: [questionTypeSchema],
    totalQuestions: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    materialUrl: {
      type: String,
      default: "",
    },
    materialOriginalName: {
      type: String,
      default: "",
    },
    additionalInfo: {
      type: String,
      default: "",
    },
    generatedPaper: generatedPaperSchema,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate totals before saving
assignmentSchema.pre("save", function () {
  if (this.questionTypes && this.questionTypes.length > 0) {
    this.totalQuestions = this.questionTypes.reduce(
      (sum, qt) => sum + qt.numberOfQuestions,
      0
    );
    this.totalMarks = this.questionTypes.reduce(
      (sum, qt) => sum + qt.numberOfQuestions * qt.marksPerQuestion,
      0
    );
  }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
