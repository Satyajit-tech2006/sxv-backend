const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../../helper/mailer.js');

const forgetpasswords = async (req, res,next) => {
    try {
        const email  = req.body.email;
        if (!email || email === "") {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.password = user.password;
        const userId = user?._id;
        const hashToken = jwt.sign({userId}, process.env.jwt_secret_key,{expiresIn:"1h"});
        req.token = hashToken;      
        next();
    } catch (error) {
        console.error("Error occurred in forgotpassword middleware:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = forgetpasswords;
