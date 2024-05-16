import mongoose from "mongoose";
import { DATABASE_URI } from "../config/exportEnv.js";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DATABASE_URI);
    console.log("Database connected successfully !", connect.connection.host);
  } catch (error) {
    console.log("Connection Error !", error);
  }
};
export default connectDB;
