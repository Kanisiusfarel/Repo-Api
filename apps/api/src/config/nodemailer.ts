import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import environment from "dotenv";
import { Email } from "../models/models";

environment.config();

const transporter: any = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

async function sendMail(email: Email) {
  // Menggunakan path untuk mendapatkan lokasi template
  const templatePath = path.join(__dirname, "/views", `${email.template}.ejs`);

  // Render file EJS menjadi HTML
  const html = await ejs.renderFile(templatePath, email.context);

  // Mengatur opsi email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email.to,
    subject: email.subject,
    html,
  };

  // Mengirim email
  return transporter.sendMail(mailOptions);
}

export default sendMail;