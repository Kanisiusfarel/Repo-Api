// sendMail.ts
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import ejs from "ejs";
import path from "path";
import environment from "dotenv";
import { EmailModel } from "../models/models";

environment.config();

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

async function sendMail(email: EmailModel): Promise<void> {
  const templatePath = path.join(__dirname, "/views", `${email.template}.ejs`);

  // Menggunakan type assertion untuk memastikan tipe hasil render adalah string
  const html = (await ejs.renderFile(templatePath, email.context)) as string;

  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER,
    to: email.to,
    subject: email.subject,
    html, // Menggunakan html yang sudah bertipe string
  };

  await transporter.sendMail(mailOptions);
}

export default sendMail;
