var express = require("express");
var mongoose = require("mongoose");

//Connect mongo to a database
mongoose.connect("mongodb://localhost/urlShortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

//Routes
app.get("/", (req, res) => {
  res.send("Oi guria");
});

// app.post("/bigUrl", (req, res) => {});

app.listen(3080, () => {
  console.log("server is running");
});
