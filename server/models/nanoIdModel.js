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
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    timePeriod: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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
  },
  {
    timestamps: true,
  }
);

const NanoIDModel = mongoose.model("NanoIDInfo", nanoIDSchema);
export default NanoIDModel;
