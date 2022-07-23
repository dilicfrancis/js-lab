const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const welcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "email@example.com",
    subject: "Welcome aboard!",
    text: `Dear ${name},\nWelcome to our platform. tee tee`,
  });
};

const exitEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "email@example.com",
    subject: "Sorry to see you go!",
    text: `Dear ${name},\nWhat could we have done differently? :(`,
  });
};

module.exports = {
  welcomeEmail,
  exitEmail,
};
