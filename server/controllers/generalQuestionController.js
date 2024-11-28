import asyncHandler from "express-async-handler";
import GeneralQuestionSet from "../models/generalQModel.js";

//General Question COntrollers
const createGeneralQuestions = asyncHandler(async (req, res) => {
  const { subject, language, topic } = req.body;

  const generalQuestionSet = new GeneralQuestionSet({
    subject,
    language,
    topic,
    mcqs: [],
  });
  const savedGQuestionSet = await generalQuestionSet.save();
  if (!savedGQuestionSet) {
    res.status(404);
    throw new Error("Failed to save the data in the database");
  }
  res.status(201).json({
    success: true,
    message: "General Exam save successfully",
    generalQuestionSetId: savedGQuestionSet._id,
    data: generalQuestionSet,
  });
});
const addMCQforGQ = asyncHandler(async (req, res) => {
  const { generalQuestionSetId } = req.params;
  const { questionName, options, correctOption } = req.body;

  const generalQuestionSet = await GeneralQuestionSet.findById(
    generalQuestionSetId
  );
  if (!generalQuestionSet) {
    res.status(404).json({
      message: "Question set not found",
    });
  }
  const newMCQset = { questionName, options, correctOption };
  generalQuestionSet.mcqs.push(newMCQset);
  await generalQuestionSet.save();
  res.status(200).json({
    message: "MCQ added ",
    generalQuestionSetId: generalQuestionSetId,
    mcqs: newMCQset,
  });
});

const getGeneralQuestions = asyncHandler(async (req, res) => {
  const allQuestions = await GeneralQuestionSet.find({});
  if (!allQuestions || allQuestions.length === 0) {
    res.status(404).json({
      message: "Not Found",
    });
  }
  res.status(200).json({
    message: "Fetch Successfull ",
    data: allQuestions,
  });
});
const updateGeneralQuestions = asyncHandler(async (req, res) => {});
const deleteGeneralQuestions = asyncHandler(async (req, res) => {});

export {
  createGeneralQuestions,
  addMCQforGQ,
  getGeneralQuestions,
  updateGeneralQuestions,
  deleteGeneralQuestions,
};
