const mongoose = require("mongoose");

const UrlInfo = mongoose.model("UrlInfo", {
  longUrl: {
    type: String,
    required: false,
  },
  keyword: {
    type: String,
    required: false,
  },
  shortUrl: {
    type: String,
    required: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = UrlInfo;
