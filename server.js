require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const places = require('./app/routes/placesRoutes');
const user = require('./app/routes/user.routes');
const booking = require('./app/routes/booking.routes');
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

const placeRoutes = require("./app/routes/placeRoutes")
app.use("/places", placeRoutes)
app.use("/users", user)
app.use("/bookings", booking)

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

