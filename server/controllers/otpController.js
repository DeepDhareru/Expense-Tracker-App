const OTP =
  require("../models/OTP");

const otpGenerator =
  require("otp-generator");

const sendEmail =
  require("../utils/sendEmail");

// SEND OTP
exports.sendOTP = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    // GENERATE OTP
    const otp =
      otpGenerator.generate(6, {

        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

    // SAVE OTP
    await OTP.create({
      email,
      otp,
    });

    // SEND EMAIL
    await sendEmail(

      email,

      "Expense Tracker OTP Verification",

      `Your OTP is ${otp}`

    );

    res.json({
      success: true,
      msg: "OTP Sent Successfully",
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message,
    });
  }
};

// VERIFY OTP
exports.verifyOTP = async (
  req,
  res
) => {

  try {

    const { email, otp } =
      req.body;

    const existingOTP =
      await OTP.findOne({
        email,
        otp,
      });

    if (!existingOTP) {

      return res.status(400).json({
        msg: "Invalid OTP",
      });
    }

    res.json({
      success: true,
      msg: "OTP Verified",
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message,
    });
  }
};