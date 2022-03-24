const mongoose = require('mongoose');

const resSchema = new mongoose.Schema({
    checkin: {
        type: Date,
        default: Date.now
    },
    checkout: {
        type: Date,
        default: Date.now
    },
    numAdults: {
       type: String,
       required: true
    },
    numChildren: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        maxlength: 10
    }
})

module.exports = mongoose.model('Res', resSchema)