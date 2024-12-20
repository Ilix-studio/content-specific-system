import mongoose from "mongoose";

const newPaymentSchema = mongoose.Schema({
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
  },
  courseName: {
    type: String,
  },
  timePeriod: {
    type: String,
  },
  passkeyCount: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  payStatus: {
    type: String,
  },
});

const NewPaymentModel = mongoose.model("NewPaymentInfo", newPaymentSchema);
export default NewPaymentModel;
