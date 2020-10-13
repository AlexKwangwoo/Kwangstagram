import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};// 이부분은 따라해야함

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "kwangwoo.back@edu.sait.ca",
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret it ${secret}.<br>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};// sendMail에서 client를 붙여 함수를 보냄!