import express from "express";
import {
  createMockQuestion,
  addMCQforMQ,
  getMockQuestion,
  updateMockQuestion,
  deleteMockQuestion,
} from "../../controllers/mcqControllers/mockQuestionController.js";

const router = express.Router();
import { protectAccess } from "../../middleware/authMiddleware.js";

//Mock Question Routes
router.get("/get-mockQ", protectAccess, getMockQuestion);
router.post("/create-mockQuestion", protectAccess, createMockQuestion);
router.post(
  "/add-mockQuestions/:mockQuestionSetId",
  protectAccess,
  addMCQforMQ
);
router.patch("/updateMQ/:id", protectAccess, updateMockQuestion);
router.delete("/deleteMQ/:id", protectAccess, deleteMockQuestion);

export default router;
