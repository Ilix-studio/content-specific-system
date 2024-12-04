import express from "express";
const router = express.Router();

import {
  createGeneralQuestions,
  addMCQforGQ,
  getGeneralQuestions,
  updateGeneralQuestions,
  deleteGeneralQuestions,
} from "../../controllers/mcqControllers/generalQuestionController.js";

//General Question ROutes
router.get("/get-generalQ", getGeneralQuestions);
router.post("/create-generalQuestions", createGeneralQuestions);
router.post("/add-generalQuestions/:generalQuestionSetId", addMCQforGQ);
router.patch("/updateGQ/:id", updateGeneralQuestions);
router.delete("/deleteGQ/:id", deleteGeneralQuestions);

export default router;

// http://localhost:8080/api/institute/GQ/create-generalQuestions
