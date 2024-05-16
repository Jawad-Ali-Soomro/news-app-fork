import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/envManager.js";

export const assignAccessToken = payload => {
  const accessToken = Jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
  return accessToken;
};

export const assignRefreshToken = payload => {
  const refreshToken = Jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "10d" });
  return refreshToken;
};

export const verifyAccessToken = encodedToken => {
  try {
    const decodedToken = Jwt.verify(encodedToken, ACCESS_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = encodedToken => {
  try {
    const decodedToken = Jwt.verify(encodedToken, REFRESH_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
