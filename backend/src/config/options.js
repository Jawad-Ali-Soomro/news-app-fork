import { FRONTEND_ORIGIN } from "../config/envManager.js";

//setup configuration of cookies for storing tokens in user's browser cookies
export const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 1000 * 60 * 60 * 24 * 3,
  secure: true,
};

//setup configuration of cors to allow over frontend App Origin to access server
export const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
