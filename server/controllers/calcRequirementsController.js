import asyncHandler from "express-async-handler";
import calculateTotalAmount from "../utils/priceCalc.js";
import PaymentInfo from "../models/paymentModel.js";

const calculateRequirement = asyncHandler(async (req, res) => {
  // instituteId field if neccessary
  const { courseId, timePeriod, nanoIdCount } = req.body;
  // Validate inputs
  if (!courseId || !timePeriod || !nanoIdCount) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  // Calculate total amount
  const totalAmount = calculateTotalAmount(timePeriod, nanoIdCount);
  // Create payment record
  const payment = new PaymentInfo({
    courseId,
    timePeriod,
    nanoIdCount,
    totalAmount,
    status: "pending", // Initially set as 'pending' until payment is made
  });
  await payment.save();
  res.status(201).json(payment);
  if (!payment) {
    res.status(400);
    throw new Error("Payment Failed");
  }
});

export { calculateRequirement };
