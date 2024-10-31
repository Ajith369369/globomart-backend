// import mongoose
const mongoose = require("mongoose");

// create schema
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

// create model
// users - collection name
// userSchema - schema name
const users = mongoose.model("users", userSchema);

// export model
module.exports = users;
