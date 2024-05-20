import dotenv from "dotenv";
import process from "node:process";

dotenv.config({ path: ".env" });

export const DATABASE_URI = process.env.DATABASE_URI;
export const PORT = process.env.PORT || 8000;
export const API_KEY = process.env.API_KEY;
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
export const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const MODE = process.env.MODE;
