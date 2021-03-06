const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leader = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Leaders = mongoose.model('leader', leader);
module.exports = Leaders;