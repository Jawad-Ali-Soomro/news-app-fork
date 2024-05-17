import app from "./app.js";
import { PORT } from "./config/envManager.js";
import connectDB from "./database/connection.js";
import process from "node:process";

// connect mongoDB database and listen server on respective PORT
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port :", PORT);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

process.on("uncaughtException", error => {
  console.log("unhandled Error Exception occured !", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, reason);
});
