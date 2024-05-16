import { MODE } from "../config/exportEnv.js";

// eslint-disable-next-line no-unused-vars
export const handleError = (err, req, res, next) => {
  console.log("In errorHandler, Error has detected !", err);
  err.statusCode = err.statusCode || 500;
  if (MODE !== "PRODUCTION") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};
