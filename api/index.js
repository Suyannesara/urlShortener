require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt');
const connectToDb = require("./database");
const UrlInfo = require("./models/UrlInfo");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

//connect to database
connectToDb();

const app = express();

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Giving acess to frontend - CORS
const cors = require("cors");
const authenticateToken = require("./middlewares");

const allowedOrigins = [
  "http://localhost:8080",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requisições sem origin (ex: apps mobile ou curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

//Routes
app.get("/", authenticateToken, async (req, res) => {
  try {
    const shortUrls = await UrlInfo.find({ userId: req.user.userId });
    res.send({ shortUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/urlInfo", authenticateToken, async (req, res) => {
  //extracting data from the body
  const { longUrl, keyword, clicks, expiresAt } = req.body;

  //Generate shortUrl by the keyword
  let shortUrl = `${process.env.BACKEND_URL}/${req.user.userId}/${req.body.keyword}`;

  let urlInfo = {
    longUrl,
    keyword,
    shortUrl,
    clicks,
    userId: req.user.userId,
    expiresAt: expiresAt ? new Date(expiresAt) : null
  };

  //Create on BD
  try {
    const exists = await UrlInfo.findOne({
      userId: req.user.userId,
      keyword: keyword
    });
  
    if (exists) {
      return res.status(400).json({ message: "Essa palavra-chave já foi usada por você." });
    }
    
    await UrlInfo.create(urlInfo);

    res.status(201).json({ message: "Saved with success" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a url"});
  }
});

app.get("/:userId/:shortUrl", async (req, res) => {
  const { userId, shortUrl } = req.params;
  
  const urlInfo = await UrlInfo.findOne({
    userId: userId,
    keyword: shortUrl
  });

  if (!urlInfo) {
    return res.status(404).send("URL não encontrada.");
  }

  if (urlInfo.expiresAt && new Date() > urlInfo.expiresAt) {
    return res.status(410).send("Esta URL expirou.");
  }

  urlInfo.clicks++;
  await urlInfo.save();

  res.redirect(urlInfo.longUrl);
});


app.post("/register", async (req, res) => {
  let {username, email, password}  = req.body
  if(!email || !password){
    return res.sendStatus(400).send("Faltam elementos para que o cadastro seja completo")
  }

  try {
    // US2 - O banco de dados deve armazenar senhas criptografadas e garantir a unicidade dos e-mails
    // Verificar se o e-mail já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    if (username == "") {
      // gera o username com base no email
      username = email.split("@")[0];
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

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Faltam elementos para realizar o login");
  }

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("E-mail ou senha incorretos");
    }

    // Compara a senha fornecida com a senha criptografada
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("E-mail ou senha incorretos");
    }

    // Opcional: gerar token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, //todo: por essa variavel no ambiente prod
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/urlInfo/:keyword", authenticateToken, async (req, res) => {
  const { keyword } = req.params;

  try {
    // Verifica se existe uma URL com esse keyword associada ao usuário autenticado
    const urlInfo = await UrlInfo.findOne({
      userId: req.user.userId,
      keyword: keyword,
    });

    if (!urlInfo) {
      return res.status(404).json({ message: "URL não encontrada." });
    }

    await UrlInfo.deleteOne({ _id: urlInfo._id });

    res.status(200).json({ message: "URL excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir a URL." });
  }
});

app.put("/urlInfo/:keyword", authenticateToken, async (req, res) => {
  const { keyword } = req.params;
  const { newLongUrl, newKeyword, expiresAt } = req.body;

  try {
    const urlInfo = await UrlInfo.findOne({
      userId: req.user.userId,
      keyword: keyword
    });

    if (!urlInfo) {
      return res.status(404).json({ message: "URL não encontrada." });
    }

    // Se quiser mudar a keyword, verifica se ela já está em uso
    if (newKeyword && newKeyword !== keyword) {
      const keywordExists = await UrlInfo.findOne({
        userId: req.user.userId,
        keyword: newKeyword,
      });
      if (keywordExists) {
        return res.status(400).json({ message: "Essa nova palavra-chave já está em uso." });
      }
      urlInfo.keyword = newKeyword;
      urlInfo.shortUrl = `${process.env.BACKEND_URL}/${req.user.userId}/${newKeyword}`;
    }

    if (expiresAt) {
      console.log(new Date(expiresAt))
      console.log({expiresAt})
      urlInfo.expiresAt = expiresAt ? new Date(expiresAt) : null;
    }

    if (newLongUrl) {
      urlInfo.longUrl = newLongUrl;
    }

    await urlInfo.save();

    res.status(200).json({ message: "URL atualizada com sucesso.", urlInfo });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Erro ao atualizar a URL." });
  }
});



app.listen(3080, () => {
  console.log("server is running");
});
