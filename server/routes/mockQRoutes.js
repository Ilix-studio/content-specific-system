import express from "express";
import {
  createMockQuestion,
  addMCQforMQ,
  getMockQuestion,
  updateMockQuestion,
  deleteMockQuestion,
} from "../controllers/mockQuestionController.js";

const router = express.Router();

//Mock Question Routes
router.get("/get-mockQ", getMockQuestion);
router.post("/create-mockQuestion", createMockQuestion);
router.post("/add-mockQuestions/:mockQuestionSetId", addMCQforMQ);
router.patch("/updateMQ/:id", updateMockQuestion);
router.delete("/deleteMQ/:id", deleteMockQuestion);

export default router;
