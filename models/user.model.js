const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: 5,
      maxlength: 50
    },
    phone_number: {
      type: Number,
      required: [true, 'Please add a phone number'],
      maxlength: 10
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      minlength: 5,
      maxlength:  255,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 5,
      maxlength: 1024
    },
    date: {
      type: Date,
      default: Date.now
    }
}) 

const User = mongoose.model('User', UserSchema);
module.exports = User;
