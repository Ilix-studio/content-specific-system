import express from "express";
import {
  checkout,
  verifyPayment,
  instituteOrderByCourse,
  showAllOrders,
} from "../controllers/newPaymentController.js";
const router = express.Router();

router.post("/checkout", checkout);
router.post("/verify-payment", verifyPayment);

export default router;
