//Carregando módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
//const mongoose = require("mongoose");

// Configuração
//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Rotas

// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando, localhost:8081");
});
