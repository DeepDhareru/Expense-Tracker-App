const nodemailer =
  require("nodemailer");

const sendEmail = async (

  email,
  subject,
  text

) => {

  try {

    console.log(
      "EMAIL_USER:",
      process.env.EMAIL_USER
    );

    console.log(
      "Sending email to:",
      email
    );

    // TRANSPORT
    const transporter =
      nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 587,

        secure: false,

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    // VERIFY SMTP
    await transporter.verify();

    console.log(
      "SMTP Connected Successfully"
    );

    // SEND MAIL
    const info =
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to: email,

        subject,

        text,

      });

    console.log(
      "Message Sent:",
      info.messageId
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