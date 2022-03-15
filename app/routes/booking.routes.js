const express = require('express');
const router = express.Router();
const { getUser } = require('./user.routes')
const jwt = require('jsonwebtoken');
const places = require('./places.routes');
const User = require('../models/user.model')
const booking = require('../routes/booking.routes')

router.get('/', async (req, res) => {
    res.send(booking);
})

router.post('/:id', async (req, res) => {
    let addBooking = await places.findById(req.params.id)
    let addUser = await User.findById(req.decoded._id);
    let booking = req.decoded.booking;
    console.log(booking);
    console.log(addBooking);

    let inBooking = false;
    
    try {
        if (!addBooking) {
            return res.status(401).send({ msg: "No new booking made :(" });
        }

        booking.forEach((reservation) => {
            console.log(booking._id.valueOf());
            console.log(addBooking._id.valueOf());

            if (reservation._id.valueOf() == addBooking._id.valueOf()) {
                (inBooking = true), (addUser.booking = booking);
            }
        });

        if (!inBooking) {
            booking.push({addBooking: addBooking});
            addUser.booking = booking;
        }

        let newUser = {
            _id: addUser.id,
            name: addUser.name,
            email: addUser.email,
            phone_number: addUser.phone_number,
            booking: addUser.booking
        };

        let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
            expiresIn: 86400, //24 hours
        });
        console.log(booking);
        console.log(addUser.booking);
        
        const updatedUser = await addUser.save();
        res.status(201).json({ updatedUser, accessToken: token });
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
});

router.delete("/", async (req, res) => {
    let addUser = await User.findById(req.decoded._id);
    try {
        addUser.booking = [];

        let newUser = {
            _id: addUser._id,
            name: addUser.name,
            email: addUser.email,
            phone_number: addUser.phone_number,
            booking: newUser.booking
        };

        let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
            expiresIn: 86400,
        });

        await addUser.save();
        res.json({ msg: "No bookings here", accessToken: token })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
});

router.patch('/:id', async (req, res) => {
    let addUser = await User.findById(req.decoded._id);
    let booking = req.decoded.booking;

    booking.forEach((booking) => {
        console.log(booking.id);
        console.log(req.params.id);

        if (booking.id == req.params.id) {
            booking = booking.filter((bookingItem) => bookingItem.id != req.params.id);
        }
    });

    try {
        addUser.booking = booking;

        let newUser = {
            _id: addUser._id,
            name: addUser.name,
            email: addUser.email,
            phone_number: addUser.phone_number,
            booking: addUser.booking
        };

        let token = jwt.sign(newUser, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });

        const updatedBooking = await addUser.save();
        res.json({
            msg: "Booking removed successfully",
            updatedBooking, accessToken: token,
        });
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

});

module.exports = router;