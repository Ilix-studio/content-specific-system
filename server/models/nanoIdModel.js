import mongoose from "mongoose";

const nanoIDSchema = mongoose.Schema({
  nanoID: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseInfo",
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const NanoIDModel = mongoose.model("NanoIDInfo", nanoIDSchema);
export default NanoIDModel;
