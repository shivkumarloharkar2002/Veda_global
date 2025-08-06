const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendVerification = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      port: 587,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Alert from Dosel Technologies",
      html: `<p>Thankyou for choosing Dosel Technologies <b>${otp}</b> </p> <p> it will be valid for <b> 3 minutes</b></p>`,
    });
    // console.log("Message sent: %s", info);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
};

exports.mailuser = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      port: 587,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "notification from veda global",
      html: `<p>Thankyou for choosing veda global  </p> <p> Your Account created successfully</p>`,
    });
    // console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
};
