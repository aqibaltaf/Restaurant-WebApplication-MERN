const mongoose = require('mongoose');

const Events = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Title: String,
    Subtext: String,
    Thumb: String,
    Banner: String,
    Dates: String,
    Detail_text: String,
    Fee: String,
    New_url: String,
    Feature: String

})

module.exports = mongoose.model('Events', Events);