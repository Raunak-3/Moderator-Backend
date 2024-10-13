import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const nodemailerConfig = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // or 587 for TLS
  secure: false, // use true for port 465
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});
console.log(process.env.EMAIL_USER);