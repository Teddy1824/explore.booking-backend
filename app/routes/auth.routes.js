const express = require('express');
const router = express.Router();

const checkDUplicateNameOrEmail = require("../middleware/verifySignup");

router.post("/signup", checkDUplicateNameOrEmail, controller.signup);

router.post("/login", controller.login);

module.exports = router;