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
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  expiresAt: { 
    type: Date, 
    default: null 
  }
});

module.exports = UrlInfo;
