// const config = require("../configs/auth.config");
const db = require("../models/user.model");
const User = require('../models/user.model');
// const Role = db.role;
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const {name, phone_number, email, password} = req.body;

  const user = await User.create({
    name,
    phone_number,
    email,
    password
  })
  res.status(200).json({ success: true, token, id })
}