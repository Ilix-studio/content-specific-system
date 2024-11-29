import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  passkey: {
    type: String,
  },
});

const StudentModel = mongoose.model("StudentInfo", studentSchema);
export default StudentModel;
