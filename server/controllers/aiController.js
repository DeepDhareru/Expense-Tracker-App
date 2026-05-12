const {

  GoogleGenerativeAI,

} = require(
  "@google/generative-ai"
);

const Transaction =
  require("../models/Transaction");

// GEMINI CONFIG
const genAI =
  new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY

  );

// MODEL
const model =
  genAI.getGenerativeModel({

    model: "gemini-1.5-flash",

  });

// AI CHAT
exports.chatWithAI = async (
  req,
  res
) => {

  try {

    const { message } =
      req.body;

    // FETCH TRANSACTIONS
    const transactions =
      await Transaction.find();

    // FORMAT DATA
    const formattedData =
      transactions.map((t) => (

        `${t.category} - ₹${t.amount} (${t.type})`

      )).join("\n");

    // PROMPT
    const prompt = `
You are a smart AI Financial Assistant.

Analyze the following transactions and answer the user's question professionally.

Transactions:
${formattedData}

User Question:
${message}

Give practical financial advice, spending insights, and saving suggestions.
`;

    // GEMINI RESPONSE
    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    const text =
      response.text();

    res.json({
      reply: text,
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message,
    });
  }
};