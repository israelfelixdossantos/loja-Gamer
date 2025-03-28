const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/produtos", (req, res) => {
  res.send("Paginas de produtos");
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .lean()
    .then((categorias) => {
      res.render("admin/categorias", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as categorias");
      res.redirect("/admin");
    });
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  var erros = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ texto: "Nome Invalido" });
  }

  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    erros.push({ texto: "Slug Invalido" });
  }

  if (req.body.nome.length < 2) {
    erros.push({ texto: "Nome da categoria muito pequeno" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros: erros });
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };

    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "houve um erro ao salvar a categoria, tente novamente"
        );
        res.redirect("/admin");
      });
  }
});

router.get("/categorias/edit/:id", (req, res) => {
  Categoria.findOne({ _id: req.params.id })
    .lean()
    .then((categoria) => {
      res.render("admin/editcategorias", { categoria: categoria });
    })
    .catch((err) => {
      req.flash("error_msg", "Categoria não encontrada");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", (req, res) => {
  Categoria.findOne({ _id: req.body.id })
    .then((categoria) => {
      var erros = [];

      if (
        !req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null
      ) {
        erros.push({ texto: "Nome Invalido" });
      }

      if (
        !req.body.slug ||
        typeof req.body.slug == undefined ||
        req.body.slug == null
      ) {
        erros.push({ texto: "Slug Invalido" });
      }

      if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" });
      }
      if (erros.length > 0) {
        console.log("Erros encontrados:", erros);
        console.log("Dados do formulário:", req.body);

        return res.render("admin/editcategorias", {
          erros: erros,
          categoria: {
            _id: req.body.id,
            nome: req.body.nome,
            slug: req.body.slug,
          },
        });
      }

      categoria.nome = req.body.nome;
      categoria.slug = req.body.slug;

      categoria
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria editada com sucesso!");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          req.flash("error_msg", "Erro ao editar a categoria!");
          res.redirect("/admin/categorias");
        });
    })
    .catch((err) => {
      req.flash("error.msg", "Houve um erro ao editar a categoria.");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar", (req, res) => {
  Categoria.deleteOne({ _id: req.body.id })
    .then((categoria) => {
      req.flash("success_msg", "Categoria deletada com sucesso!");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao deletar a categoria!");
      res.redirect("/admin/categorias");
    });
});

module.exports = router;
