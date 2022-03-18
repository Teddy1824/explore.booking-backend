const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    phone_number: {
      type: Number,
      required: [true, 'Please add a phone number']
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      match: [
        'Please add a valid email.'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    date: {
      type: Date,
      default: Date.now
    }
}) 

const User = mongoose.model('User', UserSchema);
module.exports = User;