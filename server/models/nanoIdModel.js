import mongoose from "mongoose";

const nanoIDSchema = mongoose.Schema({
  nanoID: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const NanoIDModel = mongoose.model("NanoIDInfo", nanoIDSchema);
export default NanoIDModel;
