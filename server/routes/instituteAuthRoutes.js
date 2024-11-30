import express from "express";
const router = express.Router();
import {
  registerInstitute,
  loginInstitute,
  profileInstitute,
  logoutInstitute,
  refreshtokenInstitute,
  addCourses,
} from "../controllers/instituteAuthController.js";
import { generateNanoIDInstitute } from "../controllers/generatedNanoIDContoller.js";

router.post("/register", registerInstitute);
router.post("/login", loginInstitute);
router.get("/profile", profileInstitute);
router.post("/logout", logoutInstitute);
router.post("/add-courses", addCourses);
router.post("/generate-nanoID", generateNanoIDInstitute);
router.get("/refresh-token", refreshtokenInstitute);

export default router;
// http://localhost:8080/api/institute/account/register
