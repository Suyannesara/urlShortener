const mongoose = require("mongoose");

const UrlInfo = mongoose.model("UrlInfo", {
  longUrl: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = UrlInfo;
