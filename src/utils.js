import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

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

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "kwangwoo.back@edu.sait.ca",
    to: address,
    subject: "🔒Login Secret for Kwangstagram🔒",
    html: `Hello! Your login secret code is <strong>${secret}</strong>.<br>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};// sendMail에서 client를 붙여 함수를 보냄!!!!!

export const generateToken = (id) =>  jwt.sign({id}, process.env.JWT_SECRET);
// 토큰 생성 함수임!