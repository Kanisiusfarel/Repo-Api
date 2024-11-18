import environment from "dotenv";
import { Event } from "../models/models";
import { EmailModel } from "../models/models";
import sendEmail from "../config/nodemailer";

environment.config();

export class EmailService {
  sendEmail(email: string[], product: Event) {
    console.log("image : ", product.image)

    const mailOptions: EmailModel = {
      from: process.env.EMAIL_USER,
      to: email.join(", "),
      subject: "New Product Arrived!",
      template: "product",
      context: {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      },
    };

    return sendEmail(mailOptions);
  }
}