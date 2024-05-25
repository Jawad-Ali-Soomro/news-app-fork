import * as Yup from "yup";

const USER_ROLE = "user";
const CHANNEL_ROLE = "channel";

// Patterns
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// define user registration schema using yup
export const userRegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, "name should be at least 10")
    .max(30, "name must less then 30 characters")
    .required("name is required"),
  username: Yup.string()
    .min(10, "username should be at least 10")
    .max(30, "username must less then 30 characters")
    .matches(usernamePattern, "username must have lowercase uppercase digit ")
    .required("username is required"),
  email: Yup.string()
    .email("email must be valid")
    .matches(emailPattern, "email must be valid")
    .required("email is required"),
  password: Yup.string()
    .min(10, "password should be at least 10")
    .max(30, "password must less then 30 characters")
    .matches(passwordPattern, "password must have uppercase and one digit ")
    .required("password is required"),
  headline: Yup.string()
    .min(10, "headline must be at least 10 characters")
    .max(500, "headline must less then 500 characters")
    .optional(),
  about: Yup.string()
    .min(10, "about must be at least 10 characters")
    .max(500, "about must be at least 10 characters")
    .optional(),
  role: Yup.string()
    .oneOf([USER_ROLE, CHANNEL_ROLE], "role must be valid user or channel")
    .required("role is required"),
});
