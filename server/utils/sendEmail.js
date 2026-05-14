const { Resend } =
  require("resend");

const resend =
  new Resend(

    process.env.RESEND_API_KEY

  );

const sendEmail = async (

  email,
  subject,
  text

) => {

  try {

    const response =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: email,

        subject,

        text,

      });

    console.log(
      "EMAIL SENT:",
      response
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