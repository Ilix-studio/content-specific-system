import asyncHandler from "express-async-handler";
import InstituteAuth from "../models/instituteAuthModel.js";
import InstituteModel from "../models/instituteAuthModel.js";

const registerInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register institute" });
});
const loginInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login institute" });
});
const logoutInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout institute" });
});
const generateNanoIDInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "generated nanoID " });
});
const refreshtokenInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get refresh token" });
});

export {
  registerInstitute,
  loginInstitute,
  logoutInstitute,
  generateNanoIDInstitute,
  refreshtokenInstitute,
};
