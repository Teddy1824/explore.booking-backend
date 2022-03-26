const express = require('express');
const router = express.Router();

const checkDUplicateNameOrEmail = require("../middleware/verifySignup");

router.post("/signup", checkDUplicateNameOrEmail);

router.post("/login",);

module.exports = router;