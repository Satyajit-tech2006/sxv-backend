const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (email, userId,password) => {
  try {
    // create a hash token
    const hashToken = jwt.sign({ userId}, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });



    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot Password",
      html: `
      <html>
      <body style="font-family: 'Courier New', Courier, monospace; text-align: center;">
      <img src="https://res.cloudinary.com/dlm8mel1x/image/upload/v1739813189/sxv/hfm2yuqb9ojsjajsc6r2.png" alt="College Fest Logo" style="width: 150px; height: 100px; object-fit: contain;">
          <h2 style="color: #ff0066;">Welcome to the College Fest!</h2>
          <p style="color: #000;">Howdy, Fellow Fest Goer!</p>
          <p style="color: #000;">We're thrilled to have you join us for a fun-filled Halo and Horns-themed extravaganza!</p>
          <p style="color: #000;">Forgot your password by clicking the link below:</p>
          <div style="background-color: #fff; padding: 10px; border-radius: 5px; display: inline-block;">
              <h3 style="color: #ff0066; margin: 0;">Forgot password link:</h3>
              <h2 style="color: #000; margin: 0; font-size: 22px;"><a href=http://localhost:8000/changepassword?token=${hashToken}&password=${password}>here</a></h2>
          </div>
          <p style="color: #000;">This OTP is your golden ticket to join the festivities! Hurry, it's valid for a limited time only.</p>
          <p style="color: #000;">See you at the carnival!</p>
          <p style="color: #000;">Best regards,<br>Team ENIGMA</p>
          <img src="https://raw.githubusercontent.com/EnigmaVSSUT/samavesh-x-vassaunt/kishor/pictures/Enigmalogo.png" alt="Enigma-logo" style="width: 150px; height: 100px; object-fit: contain;">
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOption);

  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
  }
};

module.exports = sendEmail;
