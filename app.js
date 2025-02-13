//Carregando módulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
//const mongoose = require("mongoose");

// Configuração
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
