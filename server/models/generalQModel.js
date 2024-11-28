import mongoose from "mongoose";

const mcqSchema = mongoose.Schema({
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
        // Check if correctoption is a valid index in the options array
        return value >= 0 && value < this.options.length;
      },
      message: "correctoption must be a valid index of the options array",
    },
  },
});

const generalQuestionSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
  },
  mcqs: [mcqSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GeneralQuestionSet = mongoose.model(
  "GeneralQuestionSet",
  generalQuestionSchema
);
export default GeneralQuestionSet;
