const mongoose = require("mongoose");

const User = mongoose.model("User", {
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido']
  },
  name: {
    type: String,
    required: false,
  }
});

module.exports = User;
