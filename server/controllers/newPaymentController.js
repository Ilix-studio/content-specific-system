import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import NewPaymentInfo from "../models/newPaymentmodel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = asyncHandler(async (req, res) => {
  const {
    selectedCourse,
    selectedTimePeriod,
    passkeyCount,
    totalPrice,
    instituteId,
  } = req.body;
  var options = {
    amount: totalPrice * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpayInstance.orders.create(options);
  res.json({
    orderId: order.id,
    amount: amount,
    selectedCourse,
    selectedTimePeriod,
    passkeyCount,
    instituteId,
    payStatus: "created",
  });
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
  res.json({ message: "payment successfull..", success: true, orderConfirm });
});

// institute order passkey according to courseName
const instituteOrderByCourse = asyncHandler(async (req, res) => {});

// Fetch all order by courseName
const showAllOrders = asyncHandler(async (req, res) => {});

export { checkout, verifyPayment, instituteOrderByCourse, showAllOrders };
