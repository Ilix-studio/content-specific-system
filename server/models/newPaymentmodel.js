import mongoose from "mongoose";

const newPaymentSchema = mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    timePeriod: {
      type: String,
      required: true,
    },
    passkeyCount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    payStatus: {
      type: String,
    },
  },
  { strict: false }
);

const NewPaymentModel = mongoose.model("NewPaymentInfo", newPaymentSchema);
export default NewPaymentModel;
