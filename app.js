//Carregando módulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

// Configuração
// Sessão
app.use(
  session({
    secret: "lojagamer",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/Loja", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao Mongo");
  })
  .catch((err) => {
    console.log("Erro ao se conectar: " + err);
  });

// Public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => {
  res.send("Pagina inicial");
});

app.get("/produtos", (req, res) => {
  res.send("Lista de produtos");
});

app.use("/admin", admin);

// Outros
const PORT = 8089;
app.listen(PORT, () => {
  console.log("Servidor rodando, http://localhost:8089");
});
