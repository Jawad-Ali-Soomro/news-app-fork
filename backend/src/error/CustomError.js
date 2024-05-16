class CustomError extends Error {
  constructor(statusCode, message = "Something went wrong", errors, stack) {
    super();
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors || [];
    this.stack = stack || "";
  }
}

export default CustomError;
