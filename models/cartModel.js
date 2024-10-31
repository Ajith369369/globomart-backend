// import mongoose
const mongoose = require("mongoose");

// create schema
const cartSchema = new mongoose.Schema({
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
  userId: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
  grandTotal: {
    required: true,
    type: Number,
  },
});

// create model
// carts - collection name
// cartSchema - schema name
const carts = mongoose.model("carts", cartSchema);

// export model
module.exports = carts;
