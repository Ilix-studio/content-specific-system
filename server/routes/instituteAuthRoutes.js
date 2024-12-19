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

// import { calculateRequirement } from "../controllers/calcRequirementsController.js";
// import { completePayment } from "../controllers/OrderApi/completePayment.js";
import { protectAccess } from "../middleware/authMiddleware.js";

router.post("/register", registerInstitute);
router.post("/login", loginInstitute);
router.get("/refresh-token", refreshtokenInstitute);
router.get("/profile", protectAccess, profileInstitute);
router.post("/logout", logoutInstitute);

//Course and course will link with GQ & MQ
router.post("/add-courses", protectAccess, addCourses);
router.get("/get-courses", protectAccess, getCourses);
router.put("/update-course/:courseId", protectAccess, updateCourse);
router.delete("/delete-course/:courseId", protectAccess, deleteCourse);
//Order API - payment
// router.post("/calc-requirements", calculateRequirement);
// router.post("/completePayment", completePayment);

export default router;
// http://localhost:8080/api/institute/account/register
