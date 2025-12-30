const forgetpasswords = require('../../controllers/forgetPassword/forgetpassword.js')
const changepassword = require('../../controllers/changePassword/changepassword.js');
const verifyEmail = require('../../middleware/emailVerificationForgotPassword');
const sendOtp = require("../../controllers/Auth/sendOTP.js");
const { Router } = require('express');

const router = Router();

router.post('/changepassword',forgetpasswords, changepassword);
router.post('/forgotpassword',verifyEmail,sendOtp);

module.exports = router;
