import asyncHandler from "express-async-handler";
import InstituteAuth from "../models/instituteAuthModel.js";
import { nanoid } from "nanoid";
import CourseInfo from "../models/courseModel.js";
import NanoIDInfo from "../models/nanoIdModel.js";

const registerInstitute = asyncHandler(async (req, res) => {
  const { instituteName, username, phoneNumber, email, password } = req.body;
  if (!instituteName || !username || !phoneNumber || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const instituteEmailExists = await InstituteAuth.findOne({ email });
  if (instituteEmailExists) {
    res.status(400);
    throw new Error("Institute Already Exists");
  }
  const newInstitute = await InstituteAuth.create({
    instituteName,
    username,
    phoneNumber,
    email,
    phoneNumber,
    password,
  });
  if (newInstitute) {
    res.status(201).json({
      _id: newInstitute.id,
      instituteName: newInstitute.instituteName,
      username: newInstitute.username,
      phoneNumber: newInstitute.phoneNumber,
      email: newInstitute.email,
      phoneNumber: newInstitute.phoneNumber,
      password: newInstitute.password,
    });
  } else {
    res.status(400);
    throw new Error("Something is wrong");
  }
  //something do about phonenumber
});

const loginInstitute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const instituteEmail = await InstituteAuth.findOne({ email });
  if (instituteEmail && password) {
    res.json({
      _id: instituteEmail.id,
      instituteName: instituteEmail.instituteName,
      email: instituteEmail.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid");
  }
});

const profileInstitute = asyncHandler(async (req, res) => {
  res.status(200).json(req.newInstitute);
  console.log("Instittute Profile");
});

const logoutInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout institute" });
});

const addCourses = asyncHandler(async (req, res) => {
  const { courseName, instituteId, timePeriods } = req.body;
  const institute = await InstituteAuth.findById(instituteId);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }
  const newCourse = new CourseInfo({
    courseName,
    institute: instituteId,
    timePeriods,
  });
  const savedCourse = await newCourse.save();
  res.status(201).json({
    message: "Course added Successfully",
    courseName: savedCourse,
  });
});

const generateNanoIDInstitute = asyncHandler(async (req, res) => {
  const { instituteId, courseId, batchSize, timePeriod } = req.body;
  const institute = await InstituteAuth.findById(instituteId);
  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }

  const courseName = await CourseInfo.findById(courseId);
  if (!courseName) {
    res.status(404);
    throw new Error("Course not found");
  }
  //Find the price for the selected time period
  const selectedPeriod = courseName.timePeriods.find(
    (period) => period.duration === timePeriod
  );
  if (!selectedPeriod) {
    res.status(404);
    throw new Error("select specific time period");
  }
  //Calculate expiration data based on the selected time period
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + selectedPeriod.duration);
  //Generate batch of NanoId and save them
  const nanoIDs = [];
  for (let i = 0; i < batchSize; i++) {
    const newNanoID = nanoid(13);
    const nanoIDDoc = new NanoIDInfo({
      nanoID: newNanoID,
      courseName: courseName._id,
      expirationDate: expirationDate,
      isActive: true,
    });
    await nanoIDDoc.save();
    nanoIDs.push(newNanoID);
  }
  res.status(200).json({
    message: `${batchSize} Nano IDs generated successfully`,
    nanoIDs: nanoIDs,
  });
});

const refreshtokenInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get refresh token" });
});

export {
  registerInstitute,
  loginInstitute,
  profileInstitute,
  logoutInstitute,
  addCourses,
  generateNanoIDInstitute,
  refreshtokenInstitute,
};
