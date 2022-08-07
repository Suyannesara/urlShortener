const mongoose = require("mongoose");

const UrlInfo = mongoose.model("UrlInfo", {
  longUrl: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = UrlInfo;
