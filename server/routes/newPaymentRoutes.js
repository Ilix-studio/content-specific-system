import express from "express";
import {
  checkout,
  verifyPayment,
  instituteOrderByCourse,
  showAllOrders,
} from "../controllers/newPaymentController.js";
import { protectAccess } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/checkout", protectAccess, checkout);
router.post("/verify-payment", protectAccess, verifyPayment);

export default router;
