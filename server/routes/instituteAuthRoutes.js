import express from "express";
const router = express.Router();
import {
  registerInstitute,
  loginInstitute,
  logoutInstitute,
  generateNanoIDInstitute,
  refreshtokenInstitute,
} from "../controllers/instituteAuthController.js";

router.post("/register", registerInstitute);
router.post("/login", loginInstitute);
router.post("/logout", loginInstitute);
router.post("/generate-nanoID", generateNanoIDInstitute);
router.get("/refresh-token", refreshtokenInstitute);

export default router;
// http://localhost:8080/api/institute/account/register
