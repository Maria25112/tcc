const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const usuarioModel = require("../models/usuarioModel");
const UsuarioController = require("../controllers/usuarioController");

router.post("/cadastro", usuarioController.cadastrar);
router.post("/login", usuarioController.login);

//rotas da página de reflexões
router.post("/avaliacoes", UsuarioController.salvarAvaliacao);
router.get("/avaliacoes", usuarioController.listarAvaliacoes);
router.put("/avaliacoes/:id/curtir", usuarioController.curtirAvaliacao);

module.exports = router; 