import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import InstituteAuth from "../models/instituteAuthModel.js";
import CourseInfo from "../models/courseModel.js";
import NanoIDInfo from "../models/nanoIdModel.js";
import PaymentInfo from "../models/paymentModel.js";
import calculatePaymentAmount from "../utils/priceCalc.js";

// Genrate token for institute by batch(students) by course
const generateNanoIDInstitute = asyncHandler(async (req, res) => {
  const { instituteId, courseId, batchSize, timePeriod } = req.body;

  // Find the institute
  const institute = await InstituteAuth.findById(instituteId);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }

  // Find the course
  const courseName = await CourseInfo.findById(courseId);
  if (!courseName) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Handle Payment for the selected time period
  const paymentAmount = calculatePaymentAmount(timePeriod, batchSize); // Use the price calculation function
  const payment = new PaymentInfo({
    institute: institute._id,
    amount: paymentAmount,
    timePeriod: timePeriod,
    status: "pending",
  });
  await payment.save();

  // Find the price for the selected time period in the course
  const selectedPeriod = courseName.timePeriods.find(
    (period) => period.duration === timePeriod
  );
  if (!selectedPeriod) {
    res.status(404);
    throw new Error("Select specific time period");
  }

  // Generate batch of NanoId and save them
  const nanoIDs = [];
  for (let i = 0; i < batchSize; i++) {
    const newNanoID = nanoid(13);
    // Calculate expiration date based on the selected time period
    const expirationDate = new Date();
    expirationDate.setMonth(
      expirationDate.getMonth() + selectedPeriod.duration
    );
    const nanoIDDoc = new NanoIDInfo({
      nanoID: newNanoID,
      courseName: courseName._id,
      expirationDate: expirationDate,
      isActive: true,
    });
    await nanoIDDoc.save();
    nanoIDs.push(newNanoID);
  }

  // Mark payment as completed
  payment.status = "completed";
  await payment.save();

  // Respond with the generated Nano IDs and payment information
  res.status(200).json({
    message: `${batchSize} Nano IDs generated successfully`,
    nanoIDs: nanoIDs,
    paymentAmount: paymentAmount, // Return the calculated payment amount
  });
});

export { generateNanoIDInstitute };
