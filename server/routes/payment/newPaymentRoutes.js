import express from "express";
import {
  checkout,
  verifyPayment,
  instituteOrderByCourse,
  showAllOrders,
} from "../../controllers/newPaymentController.js";
import { protectAccess } from "../../middleware/authMiddleware.js";
import { generateNanoID } from "../../controllers/nanoIdController/generatedNanoIDContoller.js";
import { getGeneratedNanoID } from "../../controllers/nanoIdController/getAllnanoIDs.js";

const router = express.Router();
router.post("/checkout", protectAccess, checkout);
router.post("/verify-payment", protectAccess, verifyPayment);

router.post("/generate-nanoID/:orderId", protectAccess, generateNanoID);
router.get("/getAll-nanoID", protectAccess, getGeneratedNanoID);

export default router;

// /api/payment/generate-nanoID
