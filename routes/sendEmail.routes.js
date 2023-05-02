const express = require("express");
const router = express.Router();
const sendEmailController = require("../controllers/nodemailer/sendEmail.controller");

router.post("/resetPassword", sendEmailController.resetPassword);
router.post("/verifEmail", sendEmailController.verifEmail);

module.exports = router;
