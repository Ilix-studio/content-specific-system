import asyncHandler from "express-async-handler";
import PaymentInfo from "../../models/paymentModel.js";

const completePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;

  // Find payment by ID
  const payment = await PaymentInfo.findById(paymentId);
  if (!payment) {
    return res.status(404).json({ msg: "Payment not found" });
  }

  // Mark payment as 'paid'
  payment.status = "completed";
  await payment.save();
  res.status(200).json({ msg: "Payment completed", payment });
});

export { completePayment };
