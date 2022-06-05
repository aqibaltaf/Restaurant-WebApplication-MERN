const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Dish_Name: String,
    Price: Number,
    Category: String,
    Serving: String,
    Description: String,
    img_url: String
})

module.exports = mongoose.model('Menu', Menu);