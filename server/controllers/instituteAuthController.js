import asyncHandler from "express-async-handler";
import InstituteAuth from "../models/instituteAuthModel.js";
import CourseInfo from "../models/courseModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

//register institute
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
  //hashpassword
  const salt = await bcrypt.genSalt(13);
  const hashPassword = await bcrypt.hash(password, salt);
  const newInstitute = await InstituteAuth.create({
    instituteName,
    username,
    phoneNumber,
    email,
    phoneNumber,
    password: hashPassword,
  });
  if (newInstitute) {
    res.status(201).json({
      _id: newInstitute.id,
      instituteName: newInstitute.instituteName,
      username: newInstitute.username,
      phoneNumber: newInstitute.phoneNumber,
      email: newInstitute.email,
      password: newInstitute.password,
    });
  } else {
    res.status(400);
    throw new Error("Something is wrong");
  }
  //something do about phonenumber
});

//login institute
const loginInstitute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const instituteEmail = await InstituteAuth.findOne({ email });

  const match = await bcrypt.compare(password);

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

//Get  institute profile
const profileInstitute = asyncHandler(async (req, res) => {
  res.status(200).json(req.newInstitute);
  console.log("Instittute Profile");
});

//logout institute
const logoutInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout institute" });
});

//add courses into institute
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

const refreshtokenInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get refresh token" });
});

export {
  registerInstitute,
  loginInstitute,
  profileInstitute,
  logoutInstitute,
  addCourses,
  refreshtokenInstitute,
};
