const express = require("express");

const app = express();
const mongoose = require("mongoose");
const CoffeeModel = require("./models/Coffee");
const OrderModel = require("./models/Order")
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://sulei:1234@cluster0.t5kps.mongodb.net/coffee-kiosk?retryWrites=true&w=majority"
);

// *********************************************************** //
//  Defining the routes the Express server will respond to
// *********************************************************** //

app.get("/getCoffee", (req, res) => {
  CoffeeModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.get("/getOrder", (req, res) => {
  OrderModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createOrder", async (req, res) => {
  const order = req.body;
  const newOrder = new OrderModel(order);

  await newOrder.save();

  res.json(order);
});

app.post("/updateOrder",  (req,res)=>{
  const id = req.body.id;
  const amount = req.body.amount;
  OrderModel.query(
    "UPDATE orders SET amount = ? where id = ?", [amount, id],
    (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})

app.delete("/deleteOrder/:id", (req,res)=>{
  const id = req.params.id;
  console.log(id)
  OrderModel.findByIdAndDelete(id,(err,product)=>{
    if(err){
      console.log("fail")
    }
    console.log("success")
  });
})


app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
})
