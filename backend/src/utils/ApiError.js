import { capitalizeWords } from "./helper";

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    const customMessage = capitalizeWords(message.replace("Error while", "Something went wrong while "));
    this.statusCode = statusCode;
    this.message = customMessage;
    this.success = false;
    this.data = null;
  }
}

export default ApiError;
