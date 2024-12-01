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
  timePeriods: [
    {
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CourseModel = mongoose.model("CourseInfo", courseSchema);
export default CourseModel;

// const generateNanoId = nanoid(10);
// if (generateNanoId) {
//   res
//     .status(200)
//     .json({ message: "Generated Nano ID", nanoID: generateNanoId });
// } else {
//   res.status(400);
//   throw new Error("Error generating Nano ID");
// }
