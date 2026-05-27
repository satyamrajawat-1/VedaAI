import Assignment from "../models/Assignment.js";
import { generateQuestionPaper } from "../utils/gemini.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .select("-generatedPaper"); 

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


export const createAssignment = async (req, res) => {
  try {
    const { dueDate, questionTypes, additionalInfo } = req.body;


    const parsedQuestionTypes =
      typeof questionTypes === "string"
        ? JSON.parse(questionTypes)
        : questionTypes;


    let materialPath = "";
    let materialOriginalName = "";
    if (req.file) {
      materialPath = req.file.path;
      materialOriginalName = req.file.originalname;
    }

  
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
      
    }

   
    const title =
      generatedPaper?.subject
        ? `Quiz on ${generatedPaper.subject}`
        : "Untitled Assignment";

   
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

    
    const materialPath = assignment.materialUrl
      ? path.join(__dirname, "../../public", assignment.materialUrl)
      : "";

  
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
