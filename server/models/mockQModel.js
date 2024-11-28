import mongoose from "mongoose";

const mockMcqSchema = mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctoption: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 0 && value < this.options.length;
      },
      message: "correctoption must be a valid index of the options array",
    },
  },
});

const mockQuestionSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  passingMarks: {
    type: Number,
    required: true,
  },
  mcqs: [mockMcqSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MockQuestionSet = mongoose.model("MockQuestionSet", mockQuestionSchema);
export default MockQuestionSet;
