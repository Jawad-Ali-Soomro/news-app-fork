import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { SMTP_FROM_EMAIL, SMTP_FROM_NAME, SMTP_PASSWORD, SMTP_USER } from "../config/envManager.js";

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/views"),
  extName: ".hbs",
};

const notifyEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  transporter.use("compile", hbs(handlebarOptions));

  const message = {
    from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    to: options.sendTo,
    subject: options.subject, // title of email
    template: "notifyEmail",
    //In context all keys are variable which use in .hbs file
    context: {
      userName: options.username,
      description: options.description,
    },
  };
  try {
    const { accepted, ...rest } = await transporter.sendMail(message);
    console.log({ ...rest, accepted });
    if (accepted.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error while sending email ");
  }
};

export default notifyEmail;
