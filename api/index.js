require("dotenv").config();
const express = require("express");
const connectToDb = require("./database");
const UrlInfo = require("./models/UrlInfo");
var bodyParser = require("body-parser");

//connect to database
connectToDb();

const app = express();

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.send("Oi guria");
});

app.post("/urlInfo", async (req, res) => {
  //extracting data from the body
  const { longUrl, keyword, shortUrl, clicks } = req.body;

  const urlInfo = {
    longUrl,
    keyword,
    shortUrl,
    clicks,
  };

  //Create on BD
  try {
    await UrlInfo.create(urlInfo);

    res.status(201).json({ message: "Saved with success" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(3080, () => {
  console.log("server is running");
});
