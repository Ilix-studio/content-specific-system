import asyncHandler from "express-async-handler";
import MockQuestionSet from "../models/mockQModel.js";

//Mock Question COntrollers

const createMockQuestion = asyncHandler(async (req, res) => {
  const { subject, language, duration, totalMarks, passingMarks } = req.body;
  const mockQuestionSet = new MockQuestionSet({
    subject,
    language,
    duration,
    totalMarks,
    passingMarks,
    mcqs: [],
  });
  const savedMQuestionSet = await mockQuestionSet.save();
  if (!savedMQuestionSet) {
    throw new Error("Failed to save the data in the database");
  }
  res.status(201).json({
    success: true,
    message: "Mock Question Set saved successfully",
    mockQuestionSetId: savedMQuestionSet._id,
    data: mockQuestionSet,
  });
});
const addMCQforMQ = asyncHandler(async (req, res) => {
  const { mockQuestionSetId } = req.params;
  const { questionName, options, correctOption } = req.body;
  const mockQuestion = await MockQuestionSet.findById(mockQuestionSetId);
  if (!mockQuestion) {
    return res.status(404).json({
      success: false,
      message: "Mock question set not found",
    });
  }
  const newMockMCQset = { questionName, options, correctOption };
  mockQuestion.mcqs.push(newMockMCQset);
  await mockQuestion.save();
  res.status(200).json({
    success: true,
    message: "MCQ added",
    mockQuestionSetId: mockQuestionSetId,
    mcqs: newMockMCQset,
  });
});
const getMockQuestion = asyncHandler(async (req, res) => {
  const allMQuestions = await MockQuestionSet.find({});
  if (!allMQuestions || allMQuestions.length === 0) {
    res.status(404).json({
      message: "Not Found",
    });
  }
  res.status(200).json({
    message: "Fetch Successfull ",
    data: allMQuestions,
  });
});

const updateMockQuestion = asyncHandler(async (req, res) => {});
const deleteMockQuestion = asyncHandler(async (req, res) => {});

export {
  createMockQuestion,
  addMCQforMQ,
  getMockQuestion,
  updateMockQuestion,
  deleteMockQuestion,
};
// optimize this controller by improving error handling, adding validation, implementing pagination, and following best practices.
