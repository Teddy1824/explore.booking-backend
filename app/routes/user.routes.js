const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const allUsers = require("../models/user.model")
const User = require("../models/user.model")
const jwt = require('jsonwebtoken')

// get all users
router.get('/', async (req, res) => {
  try {
      const usersAll = await allUsers.find()
      res.status(200).json({ msg: "Yeey, you have found the users", results: usersAll})
      } catch (err) {
          res.status(500).json({ message: err.message})
      }
})

//getting one
router.get('/:id', getUser, (req,res) => {
      res.json(res.user)
});

//update user
router.put('/:id', async (req,res) => {
      //encrypt passwords
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userDetails = {
          username: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: hashedPassword,

  };
  User.findByIdAndUpdate(req.params._id, { $set:userDetails }, { new: true }, (err, data) => {
      if(!err) {
              res.status(200).json({ code:200, message: "User updated successfully", updateUser: data })
      } else {
          console.log(err);
      }
  });
});

//delete user
router.delete("/:id", (req,res) => {
      User.findByIdAndRemove(req.params._id, (err, data) => {
              if(data == null) {
          res.status(404).json({ message: "User not found/does not exist"})
      }else {
          res.status(200).json({message: "User deleted Successfully"})
      }
  })

});


async function getUser(req, res, next) {
  let user
  try {
      user = await allUsers.findById(req.params.id)
      if(user == null) {
              return res.status(404).json({ message: "Cannot find user"})
      }
  } catch(err) {
      return res.status(500).json({ message: err.message})
  }
  res.user = user
  next()


}

module.exports.getUser = getUser
module.exports = router