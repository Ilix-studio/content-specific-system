import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  nanoID: {
    type: String,
  },
});

const StudentModel = mongoose.model("StudentInfo", studentSchema);
export default StudentModel;
