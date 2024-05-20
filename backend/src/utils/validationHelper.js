// helper function to validate data based on provided schema using Joi
export const validateFieldsBySchema = (schema, validatingData) => {
  try {
    return schema.validate(validatingData);
  } catch (error) {
    return null;
  }
};

// helper function to generate approtiate error messages for validation
export const generateValidationErrorMessages = field => {
  const messages = {
    "any.only": `${Confirm} must match the cooreponding field`,
    "string.min": `${field} must have at least 10 characters`,
    "string.max": `${field} must less then 30 characters`,
    "string.pattern.base": `${field} must be valid based on given pattern`,
  };
  return messages;
};
