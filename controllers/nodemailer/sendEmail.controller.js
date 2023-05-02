const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require("axios");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const verifEmail = async (req, res) => {
  const { receiver, emailMessage } = req.body;
  console.log("heeeere", receiver, emailMessage);
  const mailOptions = {
    from: "Eventogo@gmail.com",
    to: receiver,
    subject: "EVENTOGO | Please verify your email address",
    html: emailMessage,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      res.send({ msg: `Unexpected Error, please retry later!` });
    } else {
      console.log("verif Email sent: " + info.response);
      res.send({msg:`Email sent`});
    }
  });
};

const resetPassword = async (req, res) => {
  const { receiver, emailMessage, code } = req.body;
  console.log("heeeere", receiver, emailMessage, "code:", code);
  const mailOptions = {
    from: "Eventogo@gmail.com",
    to: receiver,
    subject: "EVENTOGO | Password Reset Verification Code.",
    html: emailMessage,
  };

  try {
    const result = await axios.get(
      `http://localhost:3000/api/user/getUser/${receiver}`
    );
    if (result.data.length > 0) {
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error(error);
          res.send({ msg: `Unexpected Error, please retry later!` });
        } else {
          console.log("Email sent: " + info.response);
          try {
            await axios.put(`http://localhost:3000/api/user/updateVerifCode`, {
              code: code,
              email: receiver,
            });
            res.send({ msg: `Email sent to ${receiver}` });
          } catch (error) {
            console.error(error);
            res.send({ msg: `Unexpected Error, please retry later!` });
          }
        }
      });
    } else {
      res.send({ msg: `Email doesn't exist in our platform!` });
    }
  } catch (error) {
    console.error(error);
    res.send({ msg: `Unexpected Error, please retry later!` });
  }
};

module.exports = { verifEmail, resetPassword };
