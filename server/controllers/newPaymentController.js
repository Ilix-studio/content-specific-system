import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import NewPaymentInfo from "../models/transaction/newPaymentmodel.js";
import NanoIDModel from "../models/transaction/nanoIdModel.js";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  headers: {
    "X-Razorpay-Account": process.env.merchant_account_id,
  },
});

// @desc    Create checkout order
// @route   POST /api/payment/checkout
// @access  Private
const checkout = asyncHandler(async (req, res) => {
  const { courseName, timePeriod, passkeyCount, amount } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpayInstance.orders.create(options);
  res.json({
    orderId: order.id,
    amount: amount,
    courseName,
    timePeriod,
    passkeyCount,
    payStatus: "created",
  });
});

// @desc    Verify payment and save passkeys
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    instituteId,
    selectedCourse,
    passkeyCount,
    selectedTimePeriod,
  } = req.body;
  let orderConfirm = await NewPaymentInfo.create({
    orderId,
    paymentId,
    signature,
    amount,
    instituteId,
    selectedCourse,
    passkeyCount,
    selectedTimePeriod,
    payStatus: "paid",
  });
  res.json({
    message: "payment successfull..",
    success: true,
    orderConfirm,
    amount,
  });
});
// institute order passkey according to courseName
const saveThePasskey = asyncHandler(async (req, res) => {
  const { passkeys, paymentInfo } = req.body;
  const instituteId = req.institute._id;

  // First save payment information
  const newPayment = new NewPaymentInfo({
    ...paymentInfo,
    instituteId,
    payStatus: "SUCCESS",
  });
  const savedPayment = await newPayment.save();

  // Calculate dates
  const generatedAt = new Date();
  const activatedAt = new Date();
  const timePeriod = parseInt(passkeys[0].timePeriod);
  const expiresAt = new Date(
    activatedAt.setMonth(activatedAt.getMonth() + timePeriod)
  );

  // Save passkeys
  const passkeyDocs = passkeys.map((passkey) => ({
    nanoID: [passkey.id],
    courseName: passkey.courseName,
    timePeriod: passkey.timePeriod,
    generatedAt,
    activatedAt,
    expiresAt,
    isUsed: false,
    usedBy: null,
    payment: savedPayment._id,
    instituteId,
  }));

  const savedPasskeys = await NanoIDModel.insertMany(passkeyDocs);
  res.status(201).json({
    success: true,
    passkeys: savedPasskeys,
    payment: savedPayment,
  });
  if (!savedPasskeys) {
    res.status(500).json({
      message: "Check saveThePasskey controller",
      error: error instanceof Error ? error.message : "Check the backend error",
    });
  }
});

// to get all the pais passkey or nanoId into frontend
const showThePaidPasskey = asyncHandler(async (req, res, next) => {
  const instituteId = req.institute._id;
  const passkeys = await NanoIDModel.find({ instituteId })
    .populate(
      "payment",
      "razorpay_order_id razorpay_payment_id amount orderDate payStatus"
    )
    .populate("usedBy", "name email")
    .sort({ createdAt: -1 });
  // Group passkeys by payment
  const groupedPasskeys = passkeys.reduce((acc, passkey) => {
    const paymentId = passkey.payment?._id?.toString();
    if (!acc[paymentId]) {
      acc[paymentId] = {
        payment: passkey.payment,
        passkeys: [],
      };
    }
    acc[paymentId].passkeys.push(passkey);
    return acc;
  }, {});
  // Add statistics
  const stats = {
    totalPasskeys: passkeys.length,
    activePasskeys: passkeys.filter((p) => p.status === "ACTIVE").length,
    usedPasskeys: passkeys.filter((p) => p.isUsed).length,
    expiredPasskeys: passkeys.filter((p) => p.status === "EXPIRED").length,
  };

  res.status(200).json({
    success: true,
    data: Object.values(groupedPasskeys),
    stats,
  });
  if (!groupedPasskeys) {
    res.status(500).json({
      message: "Check showThePaidPasskey controller",
      error: error instanceof Error ? error.message : "Check the backend error",
    });
  }
});

export { checkout, verifyPayment, saveThePasskey, showThePaidPasskey };
