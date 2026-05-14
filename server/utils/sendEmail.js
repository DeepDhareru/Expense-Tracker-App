const nodemailer =
  require("nodemailer");

const sendEmail = async (
  email,
  subject,
  text
) => {

  try {

    const transporter =
      nodemailer.createTransport({

        host:
          "smtp-relay.brevo.com",

        port: 587,

        secure: false,

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    // SEND EMAIL
    const info =
      await transporter.sendMail({

        from: `"ExpenseAI" <${process.env.EMAIL_USER}>`,

        to: email,

        subject,

        text,

      });

    console.log(
      "EMAIL SENT:",
      info.response
    );

  } catch (err) {

    console.log(
      "EMAIL ERROR:",
      err
    );
  }
};

module.exports =
  sendEmail;