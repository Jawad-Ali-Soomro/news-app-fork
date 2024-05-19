import nodemailer from "nodemailer";
import { SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME } from "../config/envManager.js";
import path from "path";
import handlebars from "nodemailer-express-handlebars";

// define handlebars options
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/views"),
  extName: ".hbs",
};

// define nodemailer transporter options
const transporterOptions = {
  service: "gmail",
  auth: {
    user: SMTP_FROM_EMAIL,
    pass: SMTP_PASSWORD,
  },
};

// create mailer transporter
const transporter = nodemailer.createTransport(transporterOptions);

// use handlebars templates in emails
transporter.use("compile", handlebars(handlebarOptions));

// utility function to send email to user based on provided mail options
const sendEmail = async ({ sendTo, subject, template, context, attachments = [] }) => {
  try {
    const mailOptions = {
      from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
      to: "atifahmad2219@gmail.com",
      // to: sendTo,
      subject: subject,
      template: template,
      context: context,
      attachments,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    console.log("Something went wrong while sending Email ", error);
    return null;
  }
};

export { sendEmail };
