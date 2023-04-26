import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: true,
      auth: {
        user: "weparentdev@gmail.com",
        pass: "aquvqwllbguqcduk",
      },
    });

    await transporter.sendMail({
      from: "weparentdev@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export default sendEmail;
