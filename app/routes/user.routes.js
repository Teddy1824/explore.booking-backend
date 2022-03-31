const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const allUsers = require("../models/user.model")
const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

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

//adding users
router.post('/signup', DuplicatedUsernameorEmail ,async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User ({
      name: req.body.name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: hashedPassword
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
    console.log(salt);
    console.log(hashedPassword);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// LOGIN user with email + password
router.post("/login", async (req, res, next) => {
 try {
   const result = JSON.parse('');
   console.log(result)
   User.findOne({ name: req.body.name }, (err, user) => {
     if (!user) {
       return res.status(404).send({ msg: "User not found." })
     }
     if (err) 
       return handleError(err);
       let passwordIsValid = bcrypt.compareSync(
         req.body.password,
         user.password
       );
       if (!passwordIsValid) {
         return res.status(401).send({  
           msg: "Invalid password"
         });
       }
       let token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: 86400
       });
       res.status(200).send({
         id: user._id,
         name: user.name,
         phone_number: user.phone_number,
         email: user.email,
         password: user.password,
         accessToken: token
       });
   })
 } catch (err) {
   res.status(400).json({ message: err.message })
 }
})

//update user
router.put('/:id', async (req,res) => {
      //encrypt passwords
const salt = await bcrypt.genSalt(10)
 const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const userDetails = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: hashedPassword,

  };
  User.findByIdAndUpdate(req.params._id, { $set:userDetails }, { new: true }, (err, data) => {
      if(!err) {
              res.status(200).json({ message: "User updated successfully", updateUser: data })
      } else {
          console.log(err);
      }
  });
});

//delete user
router.delete("/:id", async (req,res) => {
  //     User.findByIdAndRemove(req.params._id, (data) => {
  //             if(data == null) {
  //         res.status(404).json({ message: "User not found/does not exist"})
  //     } else {
  //         res.status(200).json({message: "User deleted Successfully"})
  //     }
  // })

try {
     await res.usersAll.remove();
     res.json({ msg: "User deleted Successfully"})
   
} catch (err) {
  res.status(500).json({ msg: err.msg })
}

})


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

async function DuplicatedUsernameorEmail(req, res, next) {
  let user;

  try {
    user = await User.findOne({ name: req.body.name });
    email = await User.findOne({ email: req.body.email });
    if(user || email) {
      return res.status(404).send({ msg: "Name or Email already in use  :(" })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.msg });
  }
  next()
}

module.exports.getUser = getUser
module.exports = router