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

export const generateAccountVerificationToken = async () => {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await this.save();
  console.log("reset password token", this.resetPasswordToken, this.resetPasswordExpire);
  return resetToken;
};
