import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import NanoIDInfo from "../../models/transaction/nanoIdModel.js";
import NewPaymentInfo from "../../models/transaction/newPaymentmodel.js";

// Genrate token for institute by batch(students) by course
const generateNanoID = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const instituteId = req.institute._id;
  // Find payment by ID
  const payment = await NewPaymentInfo.findById(orderId);
  console.log(payment);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  if (payment.payStatus === "paid") {
    const nanoIds = [];
    for (let i = 0; i < payment.passkeyCount; i++) {
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
