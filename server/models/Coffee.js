const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coffee: {
    type: String,
    required: true,
  },
  milk: {
    type: String,
    required: true,
  },
  ice: {
    type: String,
    required: true,
  },
  topping: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true
  }
});

const CoffeeModel = mongoose.model("coffee-kiosk", CoffeeSchema);
module.exports = CoffeeModel;
