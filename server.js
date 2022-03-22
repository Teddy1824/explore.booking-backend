const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
const places = require('./app/routes/places.routes');
const user = require('./app/routes/user.routes');
const booking = require('./app/routes/booking.routes');
// const connectDB = require('./app/configs/db.config')
const jwt = require('jsonwebtoken')
const auth = require('./app/routes/auth.routes');
const User = require("./app/models/user.model");

require("dotenv").config();

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

  // app.post('/user/signup', async (req, res) => {
  //   try {
  //     const user = new User(req.body);
  //     let result = await user.save();
  //     result = result.toObject();
  //     if (result) {
  //       delete result.password;
  //       res.send(req.body);
  //       console.log(result);
  //     } else {
  //       console.log('User has already signed up.');
  //     }
  //   } catch (error) {
  //     res.send('Oops, something is wrong :(')
  //   }
  // });

// app.post("/user/signup", async (req, res) => {
//   try {
//     
//     const tenant = {
//       name: req.body.name, 
//       email: req.body.email, 
//       phone_number: req.body.phone_number, 
//       password: hashedPassword};
//     users.push(tenant);
//     res.sendStatus(201).send();
//   } catch {
//     res.status(500).send()
//   }
// });

app.post('/user/signup', async (req, res) => {
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
  const tenant = users.find((tenant) => tenant.username == req.body.username);
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username, password: password };
  
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
  if(!tenant) {
    return res.status(400).send("Cannot find required tenant")
  }
  try {
    if (await bcrypt.compare(req.body.password, tenant.password)) {
      res.send("Success!");
    } else {
      res.send("Sorry, you not authorized to login.")
    }
  } catch {
    res.status(500).send()
  }
});

app.post("/user/login", (req, res) => {
  //Authenticate

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
