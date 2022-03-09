const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { user } = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post('/login', async (req,res) => {
      const {error} = loginValidator(req.body)
      if (error) return res.status(400).send({ msg: 'Checking'});

      const user = await user.model.findOne({ email: req.body.email});
      if (!user) return res.status(400).send({ msg: 'Incorrect email or password!'})

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send('Correct password')

      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send(token)
  })
  app.post("/api/auth/signin", controller.signin);
};