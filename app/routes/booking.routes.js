const express = require('express');
const router = express.Router()
const { getGuest } = require('./user.routes')
const jwt = require('jsonwebtoken')
const Bookings = require('../models/res.model')

//getting all bookings
router.get("/", getGuest, async (req, res) => {
    res.send(req.decoded.booking)
});

//adding a booking
router.post("/:id", getGuest, async (req, res) => {
    let addBooking = await Bookings.findById(req.params.findByid)

    let booking = req.decoded.cart
    console.log(booking);
    console.log(addBooking);

    let inBooking = false
    try {
        if(!addBooking) {
            return res.status(401).send({ msg: "No booking made." });
        }

        booking.forEach(reservation => {
            console.log(reservation.id.valueOf());
            console.log(addBooking.id.valueOf());
            if (reservation.id.valueOf() == addBooking.id.valueOf()) {
                inBooking = true;
                res.user.booking = booking
            }
        });
        if (!inBooking) {
            booking.push(addBooking)
            res.user.booking = booking
        }

        const updatedUser = await res.user.save()

        let newUser = {
            _id: res.user.id,
            name: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            booking: res.user.booking,
        }

        let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {expiresIn:86400});
        res.status(201).json({ updatedUser, accessToken: token });
    } catch(err) {
        res.status(500).json({ msg: err.msg })
    }
});

//clearing bookings
router.delete("/", getGuest, async (req, res) => {
    try {
        res.user.booking = [];

        let newUser = {
            _id: res.user._id,
            name: res.user.name,
            email: res.user.email,
            phone_number: res.user.phone_number,
            booking: res.user.booking
        }
        let token = jwt.sign( newUser, process.env.TOKEN_SECRET, {expiresIn: 86400});
        await res.user.save();
        res.json({ msg: "Bookings cleared ;)", accessToken: token })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
});

//deleting a single booking
router.delete("/:id", getGuest, async (req, res) => {
    let booking = req.decoded.booking
    booking.forEach((reservation) => {
        console.log(reservation.id);
        console.log(req.params.id);
        if(reservation.id == req.params.id) {
            booking = booking.filter(bookingItem => bookingItem.id != req.params.id)
        }
    })
    try {
        res.user.booking = booking;

        let newUser = {
            _id: res.user._id,
            name: res.user.name,
            email: res.user.email,
            phone_number: res.user.phone_number,
            booking: res.user.Routerbooking
        }

        let token = jwt.sign( newUser, process.env.TOKEN_SECRET, {expiresIn: 86400});
        const updatedBooking = await res.user.save()
        res.json({ msg: "Reservation removed succssefully", updatedBooking, accessToken: token})
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
});