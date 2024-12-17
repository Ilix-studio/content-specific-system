import express from "express";
import {
  checkout,
  verify,
  instituteOrderByCourse,
  showAllOrders,
} from "../controllers/newPaymentController.js";
const router = express.Router();

router.post("/checkout", checkout);
router.post("/verify-payment", verify);

export default router;
