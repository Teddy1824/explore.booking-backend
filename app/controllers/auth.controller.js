const config = require("../configs/auth.config");
const db = require('../models/user.model')
const User = db.user;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup =  (req, res) => {
  const token = jwt.sign({ email: req.body.email}, config.secret) 

  const user = new User ({
    name: req.body.name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: hashedPassword
  })
  res.status(200).json({ success: true, token, id })
}