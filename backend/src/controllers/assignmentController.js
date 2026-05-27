import Assignment from "../models/Assignment.js";
import { generateQuestionPaper } from "../utils/gemini.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all assignments for current user
// @route   GET /api/v1/assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .select("-generatedPaper"); // Don't send full paper in list view

    res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single assignment with generated paper
// @route   GET /api/v1/assignments/:id
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create assignment + generate question paper with AI
// @route   POST /api/v1/assignments
export const createAssignment = async (req, res) => {
  try {
    const { dueDate, questionTypes, additionalInfo } = req.body;

    // Parse questionTypes if it's a string (from FormData)
    const parsedQuestionTypes =
      typeof questionTypes === "string"
        ? JSON.parse(questionTypes)
        : questionTypes;

    // Determine material path
    let materialPath = "";
    let materialOriginalName = "";
    if (req.file) {
      materialPath = req.file.path;
      materialOriginalName = req.file.originalname;
    }

    // Generate question paper with Gemini AI
    let generatedPaper = null;
    try {
      generatedPaper = await generateQuestionPaper({
        materialPath,
        questionTypes: parsedQuestionTypes,
        additionalInfo: additionalInfo || "",
        user: req.user,
      });
    } catch (aiError) {
      console.error("AI generation error:", aiError.message);
      // Still create the assignment even if AI fails
    }

    // Determine title from generated paper or default
    const title =
      generatedPaper?.subject
        ? `Quiz on ${generatedPaper.subject}`
        : "Untitled Assignment";

    // Create assignment
    const assignment = await Assignment.create({
      title,
      dueDate: new Date(dueDate),
      questionTypes: parsedQuestionTypes,
      materialUrl: req.file ? `/uploads/${req.file.filename}` : "",
      materialOriginalName,
      additionalInfo: additionalInfo || "",
      generatedPaper,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update assignment
// @route   PUT /api/v1/assignments/:id
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/v1/assignments/:id
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Re-generate question paper for existing assignment
// @route   POST /api/v1/assignments/:id/generate
export const regenerateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Determine material path
    const materialPath = assignment.materialUrl
      ? path.join(__dirname, "../../public", assignment.materialUrl)
      : "";

    // Re-generate with Gemini
    const generatedPaper = await generateQuestionPaper({
      materialPath,
      questionTypes: assignment.questionTypes,
      additionalInfo: assignment.additionalInfo,
      user: req.user,
    });

    assignment.generatedPaper = generatedPaper;
    await assignment.save();

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
