require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt');
const connectToDb = require("./database");
const UrlInfo = require("./models/UrlInfo");
const User = require("./models/User");
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

//Routes

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

  //Counting clicks of links
  shortUrl.clicks++;
  shortUrl.save();

  //Redirect to the longUrl
  res.redirect(shortUrl.longUrl);
});

app.post("/register", async (req, res) => {
  const {username, email, password}  = req.body
  if(!email || !password){
    return res.sendStatus(400).send("Faltam elementos para que o cadastro seja completo")
  }

  try {
    // US2 - O banco de dados deve armazenar senhas criptografadas e garantir a unicidade dos e-mails
    // Verificar se o e-mail já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    // Criptografar a senha
    // Gerar o hash da senha
    const saltRounds = 2; // Número de rounds de hashing (mais alto = mais seguro, mas mais lento)
    const criptoPassword = await bcrypt.hash(password, saltRounds);

    // Salvar no banco de dados
    await User.create({ name: username, email, password: criptoPassword });

    return res.status(201).json({ message: "Saved with success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3080, () => {
  console.log("server is running");
});
