import React from "react";
import { generateToken } from "../utils/helper";
import { FRONTEND_ORIGIN } from "../config/envManager";
import { sendEmail } from "../utils/nodemailer";
import { findUserAndUpdate } from "../services/user.service";
import ApiError from "../utils/ApiError";

const verificationEmail = async userId => {
  const verificationToken = generateToken();
  const verificationPageURL = `${FRONTEND_ORIGIN}/auth/account-verification?token=${verificationToken}`;
  const user = await findUserAndUpdate(
    { _id: userId },
    { verificationToken, verificationExpire: Date.now() * 3600 * 1000 },
  );
  if (!user) {
    throw new ApiError(500, "Error while updating verification token in user document");
  }
  await sendEmail({
    sendTo: email,
    subject: "Account Verification Email",
    template: "verificationEmail",
    context: { email, username, verificationPageURL },
  });
};

export default verificationEmail;
