const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
const places = require('./app/routes/places.routes');
const user = require('./app/routes/user.routes');
const booking = require('./app/routes/booking.routes');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://Teddy1824:n926OqJLcIy4mkUC@cluster0.hwggf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })

const users = [];

app.get("/", (req, res) => {
  res.json({ message: "HI and welcome to Explore.Booking... this is the back-end side of things." });
});

app.post("/user/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password);
    const tenant = {username: req.body.username, email: req.body.email, phone_number: req.body.phone_number, password: hashedPassword};
    users.push(tenant);
    res.sendStatus(201).send();
  } catch {
    res.status(500).send()
  }
});

app.post("/user/login", async (req, res) => {
  const tenant = users.find((tenant) => tenant.username == req.body.username);
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

app.post("/login", (req, res) => {
  //Authenticate

  const username = req.body.username;
  const user = { name: username, password: hashedPassword };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }


app.use("/places", places)
app.use("/users", user)
app.use("/bookings", booking)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

