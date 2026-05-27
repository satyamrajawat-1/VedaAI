import { Router } from "express";
import {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  regenerateAssignment,
} from "../controllers/assignmentController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();


router.use(protect);

router.get("/", getAssignments);
router.get("/:id", getAssignment);
router.post("/", upload.single("material"), createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);
router.post("/:id/generate", regenerateAssignment);

export default router;
