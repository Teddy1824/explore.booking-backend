const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    img: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 3,
        max: 7
    },
    checkin: {
        type: Date,
        default: Date.now
    },
    checkout: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('res.model', Schema)