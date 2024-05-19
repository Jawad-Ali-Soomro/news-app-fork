import mongoose from "mongoose";
import { DATABASE_URI } from "../config/envManager.js";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DATABASE_URI);
    console.log("Database connected successfully !", connect.connection.host);
  } catch (error) {
    console.log(error);
    throw new Error("Database connection error");
  }
};

export default connectDB;
