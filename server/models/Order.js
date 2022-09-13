const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderName: {
    type: String,
    required: true
  },
  size:{
    type: String,
    required:true
  },
  milk:{
    type: String,
    required:true
  },
  temp:{
    type: String,
    required:true
  },
  amount:{
    type: String,
    required:true
  },
  price:{
    type: String,
    required:true
  }
  
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
