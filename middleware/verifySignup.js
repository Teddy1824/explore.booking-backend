const User = require("../models/user.model")

checkDUplicateNameOrEmail = async (req, res, next) => {
    let user;
    try {
        user = await User.findOne({ name: req.body.name})
        email = await User.findOne({ email: req.body.email });
        if (user || email) {
            return res.status(404).send({ msg: "Oops, email has been used"})
        }
    } catch (err) {
        
    }
}