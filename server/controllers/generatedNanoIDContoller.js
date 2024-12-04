import asyncHandler from "express-async-handler";
import PaymentInfo from "../models/paymentModel.js";
import { nanoid } from "nanoid";
import NanoIDInfo from "../models/nanoIdModel.js";

// Genrate token for institute by batch(students) by course
const generateNanoID = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;
  // Find payment by ID
  const payment = await PaymentInfo.findById(paymentId);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }
  if (payment.status === "completed") {
    const nanoIds = [];
    for (let i = 0; i < payment.nanoIdCount; i++) {
      nanoIds.push(nanoid(13)); // Generate a new Nano ID
    }
    const saveTheNanoIds = new NanoIDInfo({
      nanoID: nanoIds,
      isActive: true,
    });
    await saveTheNanoIds.save();
    res.status(201).json({
      nanoIds: nanoIds,
    });
  } else {
    res.status(400).json({ msg: "Payment not completed" });
  }
});

export { generateNanoID };
