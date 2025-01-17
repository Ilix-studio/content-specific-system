import mongoose from "mongoose";

const nanoIDSchema = mongoose.Schema(
  {
    nanoID: [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],
    courseName: {
      type: String,
      required: true,
    },
    timePeriod: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "REVOKED"],
      default: "ACTIVE",
    },
    generatedAt: {
      type: Date,
      required: true,
    },
    activatedAt: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewPaymentInfo",
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NanoIDModel = mongoose.model("NanoIDInfo", nanoIDSchema);
export default NanoIDModel;
