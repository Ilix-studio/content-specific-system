import mongoose from "mongoose";

const newPaymentSchema = mongoose.Schema(
  {
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
