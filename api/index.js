require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectToDb = require("./database");
// const shortUrl = require("./models/shortUrl");

//connect to database
connectToDb();

const app = express();
//app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.send("Oi guria");
});

// app.post("/bigUrl", (req, res) => {
//   shortUrl.create({
//     bigUrl: req.body.bigUrl,
//   });

//   res.send(req.body);
// });

app.listen(3080, () => {
  console.log("server is running");
});
