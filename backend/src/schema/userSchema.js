import Joi from "joi";
import { getErrorMessages } from "../utils/validationHelper.js";
import { CHANNEL_ROLE, USER_ROLE } from "../constants.js";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the user registration schema for validation using Joi
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(10).max(30).messages(getErrorMessages("name")).required(),
  username: Joi.string().min(10).max(30).regex(usernamePattern).messages(getErrorMessages("username")).required(),
  email: Joi.string().email().regex(emailPattern).messages(getErrorMessages("email")).required(),
  password: Joi.string().min(10).max(30).regex(passwordPattern).messages(getErrorMessages("password")).required(),
  headline: Joi.string().min(10).max(500).messages(getErrorMessages("headline")).optional(),
  about: Joi.string().min(10).max(500).messages(getErrorMessages("about")).optional(),
  role: Joi.string().valid(USER_ROLE, CHANNEL_ROLE).messages(getErrorMessages("role")),
});

const userLoginSchema = Joi.object({
  username: Joi.string().required().messages(getErrorMessages("username")),
  password: Joi.string().required().messages(getErrorMessages("password")),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages(getErrorMessages("Confirm Password")),
});

const updateAccountSchema = Joi.object({
  name: Joi.string().required(),
  about: Joi.string().required(),
  headline: Joi.string().required(),
});

export { userRegistrationSchema, userLoginSchema, changePasswordSchema, updateAccountSchema };
