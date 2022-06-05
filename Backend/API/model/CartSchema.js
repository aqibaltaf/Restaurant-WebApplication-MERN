const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Dish_Name : String,
    Quantity: Number,
    Price : {type: Number},
    Description: String, 
    user_id: String
})

module.exports = mongoose.model('Cart', Cart);