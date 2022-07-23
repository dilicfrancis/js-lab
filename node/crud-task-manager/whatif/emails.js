const sgMail = require("@sendgrid/mail");

const sendGridKey = process.env.SENDGRID_KEY;

sgMail.setApiKey(sendGridKey);

sgMail.send({
  to: "example@example.com",
  from: "example@example.com",
  subject: "Welcome Aboard!",
  text: "You are now one of the first best sign-ups to enter the world of daisies.",
});
