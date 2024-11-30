import asyncHandler from "express-async-handler";
import NanoIDInfo from "../models/nanoIdModel.js";

const loginStudent = asyncHandler(async (req, res) => {
  const { nanoID } = req.body;
  //FInd the nanoID  in the database
  const nanoIDRecord = await NanoIDInfo.findOne({ nanoID, isActive: true });
  if (!nanoIDRecord) {
    return res.status(404).json({
      message: "Invalid or expired nanoID",
    });
  }
  res.status(200).json({
    message: "Login Successful",
  });
});

export { loginStudent };
