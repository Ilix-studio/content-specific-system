import express from "express";
import {
  checkout,
  verifyPayment,
  saveThePasskey,
  showThePaidPasskey,
} from "../../controllers/newPaymentController.js";
import { protectAccess } from "../../middleware/authMiddleware.js";

const router = express.Router();
router.post("/checkout", protectAccess, checkout);
router.post("/verify-payment", protectAccess, verifyPayment);

router.post("/save-passkey", protectAccess, saveThePasskey);
router.get("/show-passkeys", protectAccess, showThePaidPasskey);

export default router;

// http://localhost:8080/api/payment/save-passkey
