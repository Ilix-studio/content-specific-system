import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstituteAuth",
  },
});

const CourseModel = mongoose.model("CourseInfo", courseSchema);
export default CourseModel;
