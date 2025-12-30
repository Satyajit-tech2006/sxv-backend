const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const changepassword = async (req, res) => {
  try {
    const token = req.token;
    const password = req.password;
    console.log("password: ", password);
    console.log("token: ", token);
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    // retrieve userId from jwt

    const { userId } = jwt.verify(token, process.env.jwt_secret_key);
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // change the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.findOneAndUpdate({email:user.email},{$set:{password:hashedPassword}},{new:true,upsert:true});

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error while changing password:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = changepassword;
