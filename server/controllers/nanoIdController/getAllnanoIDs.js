import asyncHandler from "express-async-handler";
import NanoIDInfo from "../../models/transaction/nanoIdModel.js";

const getGeneratedNanoID = asyncHandler(async (req, res) => {
  const instituteId = req.institute._id; // From auth middleware

  try {
    // Find all passkeys for the institute
    const passkeys = await NanoIDInfo.find({ instituteId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("nanoID courseName timePeriod isActive isUsed createdAt");

    // Calculate basic stats
    const total = passkeys.length;
    const used = passkeys.filter((key) => key.isUsed).length;
    const unused = total - used;

    res.status(200).json({
      success: true,
      data: {
        passkeys,
        stats: {
          total,
          used,
          unused,
        },
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching passkeys: " + error.message);
  }
});

export { getGeneratedNanoID };
