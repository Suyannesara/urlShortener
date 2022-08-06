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

//Giving acess to frontend - CORS
const cors = require("cors");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");

  app.use(cors());
  next();
});

// //Routes

app.get("/", async (req, res) => {
  const shortUrls = await UrlInfo.find();
  res.send({ shortUrls: shortUrls });
});

app.post("/urlInfo", async (req, res) => {
  //extracting data from the body
  const { longUrl, keyword, clicks } = req.body;

  //Generate shortUrl by the keyword
  let shortUrl = `localhost:3080/${req.body.keyword}`;

  let urlInfo = {
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

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await UrlInfo.findOne({ keyword: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  // shortUrl.clicks++;
  // shortUrl.save();

  // redirect to the longUrl
  res.redirect(shortUrl.longUrl);
});

app.listen(3080, () => {
  console.log("server is running");
});
