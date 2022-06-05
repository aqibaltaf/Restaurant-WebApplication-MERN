const mongoose = require('mongoose');

const Promotion = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    Dishes_Name: {
        "type": "array",
        "items": {
          "type": "String"
        }
      },
    Type: String,
    Original_Price: Number,
    DiscountPercent: Number,
    Discounted_price: Number 
})

module.exports = mongoose.model('Promotion', Promotion);