const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/produtos", (req, res) => {
  res.send("Paginas de produtos");
});

router.get("/categoria", (req, res) => {
  res.send("Paginas de categorias");
});
module.exports = router;
