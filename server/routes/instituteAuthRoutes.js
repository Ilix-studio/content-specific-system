import express from "express";
const router = express.Router();
import {
  registerInstitute,
  loginInstitute,
  profileInstitute,
  logoutInstitute,
  refreshtokenInstitute,
} from "../controllers/instituteAuthController.js";
import {
  addCourses,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/aboutCourseController/courseControllers.js";
import { generateNanoID } from "../controllers/nanoIdController/generatedNanoIDContoller.js";
import { getgeneratedNanoID } from "../controllers/nanoIdController/getAllnanoIDs.js";
import { calculateRequirement } from "../controllers/calcRequirementsController.js";
import { completePayment } from "../controllers/OrderApi/completePayment.js";

router.post("/register", registerInstitute);
router.post("/login", loginInstitute);
router.get("/refresh-token", refreshtokenInstitute);
router.get("/profile", profileInstitute);
router.post("/logout", logoutInstitute);

//Course and course will link with GQ & MQ
router.post("/add-courses", addCourses);
router.get("/get-courses/:instituteId", getCourses);
router.put("/update-course/:courseId", updateCourse);
router.delete("/delete-course/:courseId", deleteCourse);
//Order API - payment
router.post("/calc-requirements", calculateRequirement);
router.post("/completePayment", completePayment);
router.post("/generate-nanoID", generateNanoID);
router.get("/getAll-nanoID", getgeneratedNanoID);

export default router;
// http://localhost:8080/api/institute/account/register
