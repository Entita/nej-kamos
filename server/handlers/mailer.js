const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'ulysses.mailer@gmail.com',
    pass: 'rzjmbwnvlmmitifg',
  },
});

const sendEmailVerification = async (id, email, url) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to: email,
    subject: "Nej kámoš - verification",
    html: `<p>Please verify your account by clicking this link <a href="${url}verification/${id}" target="_blank">Verification link</a></p>`,
  };

  return await transporter.sendMail(mailOptions);
};

const sendResetPassword = async (id, email, url) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to: email,
    subject: "Nej kámoš - reset password",
    html: `<p>There has been an request for the password reset, if you didn't request the reset link, simply ignore this email. <a href="${url}passwordReset/${id}?email=${email}" target="_blank">Reset password link</a></p>`,
  };

  return await transporter.sendMail(mailOptions);
};

exports.sendEmailVerification = sendEmailVerification;
exports.sendResetPassword = sendResetPassword;

