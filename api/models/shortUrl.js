const mongoose = require("mongoose");

//Schemas

const shortUrlSchema = new mongoose.Schema({
  bigUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("shorUrl", shortUrlSchema);
