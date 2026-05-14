const axios =
  require("axios");

const sendEmail = async (

  email,
  subject,
  text

) => {

  try {

    const response =
      await axios.post(

        "https://send.api.mailtrap.io/api/send",

        {

          from: {

            email:
              "hello@demomailtrap.com",

            name:
              "ExpenseAI",

          },

          to: [

            {
              email,
            },
          ],

          subject,

          text,

        },

        {

          headers: {

            Authorization:
              `Bearer ${process.env.MAILTRAP_TOKEN}`,

            "Content-Type":
              "application/json",

          },

        }
      );

    console.log(
      "EMAIL SENT:",
      response.data
    );

  } catch (err) {

    console.log(
      "EMAIL ERROR:",
      err.response?.data ||
        err.message
    );
  }
};

module.exports =
  sendEmail;