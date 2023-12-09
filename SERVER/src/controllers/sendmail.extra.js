const { Resend } = require("resend");

const resend = new Resend("re_bAD4KdNT_PBAhzHaiFvX5NveMn6yec6Yz");

const sendMail = async ({ mail, subject, message }) => {
  try {
    await resend.emails.send({
      from: "He ecommerce <onboarding@resend.dev>",
      to: [mail],
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
