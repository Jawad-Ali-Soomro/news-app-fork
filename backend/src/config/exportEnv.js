/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv";
dotenv.config();
export const DATABASE_URI = process.env.CONNECTION_STRING;
export const PORT = process.env.PORT;
export const API_KEY = process.env.API_KEY;
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
export const FRONTEND_ORIGIN = process.env.APP_PATH;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
export const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const MODE = process.env.MODE;


