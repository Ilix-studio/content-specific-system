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
  console.log(order, amount, courseName, timePeriod, passkeyCount, payStatus);
});

// verify , save to db
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
const saveThePasskey = asyncHandler(async (req, res) => {});

// to get all the pais passkey or nanoId into frontend
const showThePaidPasskey = asyncHandler(async (req, res) => {});

export { checkout, verifyPayment, saveThePasskey, showThePaidPasskey };
