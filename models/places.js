const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    img: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Places', placesSchema,)