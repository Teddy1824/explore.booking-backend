require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const places = require('./app/routes/places.routes');
const user = require('./app/routes/user.routes');
const booking = require('./app/routes/booking.routes');
// const connectDB = require('./app/configs/db.config')
const jwt = require('jsonwebtoken')
const auth = require('./app/routes/auth.routes');
const User = require("./app/models/user.model");


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', auth)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })

  
  const users = [];
  
  app.get("/", (req, res) => {
    res.json({ message: "HI and welcome to Explore.Booking... this is the back-end side of things." });
  });

app.post('/user/signup', async (req, res) => {
  console.log("trying to register")
  const {error} = (req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }
  const hashedPassword = await bcrypt.hash(req.body.password);
  let user = await User.findOne({ email: req.body.email });
  if(user) {
      return res.status(400).send('Sorry we already have that user :(')
  } else {
      user = new User({
          name: req.body.name,
          phone_number: req.body.phone_number,
          email: req.body.email,
          password: hashedPassword
      });
      await user.save();
      res.send(user)
  }
})


app.post("/user/login", async (req, res) => {
  console.log(req.body.name);
  const username = req.body.name;
  const {password} = req.body;
  const tenant = await User.findOne({username});
  

  // res.json({ accessToken: accessToken });
  try {
    if(!tenant) { 
      console.log('no tenant found')
      return res.status(400).json({msg: "Cannot find required tenant"})
    }
    console.log(password, tenant.password)
    if (await bcrypt.compare(password, tenant.password)) {
      console.log("I found the user")
        const accessToken = jwt.sign(tenant._id, process.env.ACCESS_TOKEN_SECRET);
       res.send({ msg: "Success!", accessToken, tenant });
    } else {
       res.send({ msg: "Sorry, you not authorized to login."})
    }
  } catch(e) {
      console.log("Some other error happened: ", e);
     res.status(500).send(e)
  }
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


app.use("/places", places)
app.use("/users", user)
app.use("/bookings", booking)

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

