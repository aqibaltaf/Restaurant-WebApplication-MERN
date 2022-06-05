const mongoose = require('mongoose');

const ContactUs = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Name: String,
    Email: String,
    Contact: Number,
    ContactMessage: String,
})

module.exports = mongoose.model('ContactUs', ContactUs);