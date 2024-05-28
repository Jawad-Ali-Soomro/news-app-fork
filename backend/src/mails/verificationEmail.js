import { FRONTEND_ORIGIN } from "../config/envManager.js";
import { sendEmail } from "../utils/nodemailer.js";
import { findUserAndUpdate } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/helper.js";

const verificationEmail = async userId => {
  const token = generateToken();
  const expire = Date.now() + 14 * 60 * 60 * 1000;
  const verificationPageURL = `${FRONTEND_ORIGIN}/auth/account-verification?token=${token}`;
  const user = await findUserAndUpdate({ _id: userId }, { verificationToken: token, verificationExpire: expire });
  if (!user) {
    throw new ApiError(500, "Error while updating verification token in user document");
  }
  await sendEmail({
    sendTo: user.email,
    subject: "Account Verification Email",
    template: "verificationEmail",
    context: { email: user.email, username: user.username, verificationPageURL },
  });
};

export default verificationEmail;
