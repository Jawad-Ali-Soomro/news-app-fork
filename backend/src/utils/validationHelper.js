// helper function to validate data based on provided schema using Joi
export const validateSchema = (schema, data) => {
  try {
    const validate = schema.validate(data);
    // if there is no validation error then return it
    if (!validate?.error) {
      return { error: false };
    }
    throw new Error(validate?.error?.details?.[0]?.message || "validation error accoured");
  } catch (error) {
    return { error: true, message: error.message };
  }
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
