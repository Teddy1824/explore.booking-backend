const bcrypt = require('bcryptjs')
const router = require('express').Router();
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { registerValidator, loginValidator } = require('../middleware/validation')

const { register, login } = require('../controllers/auth.controller')

let refreshTokens = []

router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name:user.name })
        res.json({ accessToken: accessToken })
    })
})


router.post('/signup', async (req, res) => {

  const {error} = registerValidator(req.body)
  if(error) return res.status(400).send(error.details[0].msg);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id })
  } catch(err) {
    res.status(400).send(err);
  }
}); 

router.post('/login', (req, res) => {
  const {err} = loginValidator(req.body)
  const name = req.body.name
  const user = { name: name, password: password}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s'})
}

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

module.exports = router