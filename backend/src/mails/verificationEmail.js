import { FRONTEND_ORIGIN } from "../config/envManager.js";
import { sendEmail } from "../utils/nodemailer.js";
import { findUserAndUpdate } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";

const verificationEmail = async userId => {
  const token = generateToken();
  const verificationPageURL = `${FRONTEND_ORIGIN}/auth/account-verification?token=${verificationToken}`;
  const user = await findUserAndUpdate(
    { _id: userId },
    { verificationToken: token, verificationExpire: Date.now() * 3600 * 1000 },
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
