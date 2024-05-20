import Joi from "joi";
import { generateValidationErrorMessages } from "../utils/validationHelper";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the user registration schema for validation using Joi
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(5).max(30).messages(generateValidationErrorMessages("name")).required(),
  username: Joi.string()
    .min(10)
    .max(30)
    .regex(usernamePattern)
    .messages(generateValidationErrorMessages("username"))
    .required(),
  email: Joi.string().email().regex(emailPattern).messages(generateValidationErrorMessages("email")).required(),
  password: Joi.string()
    .min(5)
    .max(30)
    .regex(passwordPattern)
    .messages(generateValidationErrorMessages("password"))
    .required(),
  headline: Joi.string().min(10).max(500).messages(generateValidationErrorMessages("headline")).optional(),
  about: Joi.string().min(10).max(500).messages(generateValidationErrorMessages("about")).optional(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().regex(emailPattern).required(),
  password: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages(generateValidationErrorMessages),
});

const updateAccountSchema = Joi.object({
  name: Joi.string().required(),
  about: Joi.string().required(),
  headline: Joi.string().required(),
});

export { userRegistrationSchema, userLoginSchema, changePasswordSchema, updateAccountSchema };
