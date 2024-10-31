// import mongoose
const mongoose = require("mongoose");

// double in MongoDB, but number in JS
// create schema
const productSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  rating: {
    rate: {
      required: true,
      type: Number,
    },
    count: {
      required: true,
      type: Number,
    },
  },
});

// create model
const products = mongoose.model("products", productSchema);

// export model
module.exports = products;
