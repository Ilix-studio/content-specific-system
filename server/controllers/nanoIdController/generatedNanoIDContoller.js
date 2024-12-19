import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import NanoIDInfo from "../../models/nanoIdModel.js";
import NewPaymentInfo from "../../models/newPaymentmodel.js";

// Genrate token for institute by batch(students) by course
const generateNanoID = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const instituteId = req.institute._id;
  // Find payment by ID
  const payment = await NewPaymentInfo.findById(orderId);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  // Verify payment belongs to institute
  if (payment.instituteId.toString() !== instituteId.toString()) {
    res.status(403);
    throw new Error("Not authorized to access this payment");
  }
  if (payment.status === "completed") {
    const nanoIds = [];
    for (let i = 0; i < payment.nanoIdCount; i++) {
      nanoIds.push(nanoid(13)); // Generate a new Nano ID
    }
    const saveTheNanoIds = new NanoIDInfo({
      nanoID: nanoIds,
      isActive: true,
      instituteId: instituteId,
      courseName: payment.courseName,
      timePeriod: payment.timePeriod,
    });
    await saveTheNanoIds.save();
    res.status(201).json({
      success: true,
      passkeys: nanoIds,
    });
  } else {
    res.status(400);
    throw new Error("Payment not completed");
  }
});

export { generateNanoID };
