const OTP = require("../../models/otp.models");

const verifyOTP = async (req, res,next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required" });
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ 
        success: false, 
        message: "OTP expired or not found. Please resend." });
    }

    if (otpRecord.otp === otp) {
      await OTP.deleteOne({ email });
      next();
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid OTP. Please check your email." 
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Verification error" });
  }
};

module.exports = verifyOTP;
