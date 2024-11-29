import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstituteAuth",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: Number,
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
