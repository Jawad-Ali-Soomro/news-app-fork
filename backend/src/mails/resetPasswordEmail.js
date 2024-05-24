import { FRONTEND_ORIGIN } from "../config/envManager.js";
import { sendEmail } from "../utils/nodemailer.js";

export const sendResetPasswordEmail = async user => {
  const resetPasswordToken = await user.generateResetPasswordToken();
  const pageURL = `${FRONTEND_ORIGIN}/reset-password/?token=${resetPasswordToken}`;
  await sendEmail({
    sendTo: user.email,
    subject: "Reset  Password Email",
    template: "resetPasswordEmail",
    context: { email: user.email, username: user.username, pageURL },
  });
};
