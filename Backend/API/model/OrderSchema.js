const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    FirstName: String,
    LastName: String,
    Address: String,
    Phone: Number,
    Order_item: String,
    Order_total: String,
    Time: Date
})

module.exports = mongoose.model('Order', Order);