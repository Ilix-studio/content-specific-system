import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  // institute: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "InstituteAuth",
  //   required: true,
  // },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseInfo",
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
  },
  nanoIdCount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model("PaymentInfo", paymentSchema);
export default PaymentModel;
