const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Name: String,
    Contact: Number,
    Email: String,
    NofPeople: Number,
    Request: String,
    Area: String,
    Date: String,
    Time: String,
    user_id: String,
})

module.exports = mongoose.model('Reservation', Reservation);