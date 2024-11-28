import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Mongo DB is connected successfully 🐟`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
