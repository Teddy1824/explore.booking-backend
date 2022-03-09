const mongoose = require("mongoose");
const User = mongoose.model("User",
  new mongoose.Schema({
    username: {
       type: String,
       required: true,
       min: 6,
       max: 255
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    password: {
       type: String,
       required: true,
       min: 6,
       max: 1024
    },
    phone_number: {
       type: String,
       required: true,
       max: 10
    },
    reservation: {
        type: Array,
        required: false,
        default: []
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;