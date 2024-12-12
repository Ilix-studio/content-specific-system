import express from "express";
const router = express.Router();

import {
  createGeneralQuestions,
  addMCQforGQ,
  getGeneralQuestions,
  updateGeneralQuestions,
  deleteGeneralQuestions,
} from "../../controllers/mcqControllers/generalQuestionController.js";
import { protectAccess } from "../../middleware/authMiddleware.js";

//General Question ROutes
router.get("/get-generalQ", protectAccess, getGeneralQuestions);
router.post("/create-generalQuestions", protectAccess, createGeneralQuestions);
router.post(
  "/add-generalQuestions/:generalQuestionSetId",
  protectAccess,
  addMCQforGQ
);
router.patch("/updateGQ/:id", protectAccess, updateGeneralQuestions);
router.delete("/deleteGQ/:id", protectAccess, deleteGeneralQuestions);

export default router;

// http://localhost:8080/api/institute/GQ/create-generalQuestions
