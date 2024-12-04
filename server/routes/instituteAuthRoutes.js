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
import { generateNanoID } from "../controllers/generatedNanoIDContoller.js";
import { calculateRequirement } from "../controllers/calcRequirementsController.js";
import { completePayment } from "../controllers/OrderApi/completePayment.js";

router.post("/register", registerInstitute);
router.post("/login", loginInstitute);
router.get("/profile", profileInstitute);
router.post("/logout", logoutInstitute);
router.post("/add-courses", addCourses);
router.post("/calc-requirements", calculateRequirement);
//Order API
router.post("/completePayment", completePayment);
router.post("/generate-nanoID", generateNanoID);
router.get("/refresh-token", refreshtokenInstitute);

export default router;
// http://localhost:8080/api/institute/account/register
