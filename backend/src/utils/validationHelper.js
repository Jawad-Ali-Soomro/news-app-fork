import ApiError from "./ApiError.js";

// helper function to validate data based on provided schema using Joi
export const validateSchema = (schema, data) => {
  const validate = schema.validate(data);
  if (!validate.error) return validate.value; // return validated values
  const message = validate?.error?.details?.[0]?.message || "validation error accoured";
  throw new ApiError(400, message);
};

// helper function to generate approtiate error messages for validation
export const getErrorMessages = field => {
  const messages = {
    "string.base": `${field} should be a type of 'text'`,
    "string.empty": `${field} cannot be an empty field`,
    "any.required": `${field} is a required field`,
    "any.only": `${field} must match the cooreponding field`,
    "string.min": `${field} must have at least 10 characters`,
    "string.max": `${field} must less then 30 characters`,
    "string.pattern.base": `${field} must be valid based on given pattern`,
  };
  return messages;
};
