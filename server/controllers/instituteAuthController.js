import asyncHandler from "express-async-handler";
import InstituteAuth from "../models/instituteAuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
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
    password: hashPassword,
  });
  if (newInstitute) {
    res.status(201).json({
      _id: newInstitute.id,
      instituteName: newInstitute.instituteName,
      username: newInstitute.username,
      phoneNumber: newInstitute.phoneNumber,
      email: newInstitute.email,
      token: generateToken(newInstitute._id),
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

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }
  const instituteLogin = await InstituteAuth.findOne({ email });
  if (!instituteLogin) {
    res.status(400);
    throw new Error("Institute not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    instituteLogin.password
  );

  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.json({
    _id: instituteLogin.id,
    instituteName: instituteLogin.instituteName,
    email: instituteLogin.email,
    token: generateToken(instituteLogin._id),
    message: "Successfully logged in",
  });
});

const profileInstitute = asyncHandler(async (req, res) => {
  // Ensure institute is authenticated
  if (!req.institute) {
    res.status(401);
    throw new Error("Not authenticated");
  }

  // Fetch fresh institute data
  const institute = await InstituteAuth.findById(req.institute._id).select(
    "-password"
  );

  if (!institute) {
    res.status(404);
    throw new Error("Institute profile not found");
  }

  const { _id, instituteName, email, username, phoneNumber } = institute;

  res.status(200).json({
    message: "Institute Profile Retrieved Successfully",
    profile: {
      id: _id,
      instituteName,
      email,
      username,
      phoneNumber,
    },
  });
});

//logout institute
const logoutInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout institute" });
});

const refreshtokenInstitute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get refresh token" });
});

export {
  registerInstitute,
  loginInstitute,
  profileInstitute,
  logoutInstitute,
  refreshtokenInstitute,
};
