import mongoose from "mongoose";
const instituteSchema = mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InstituteModel = mongoose.model("InstituteAuth", instituteSchema);
export default InstituteModel;
