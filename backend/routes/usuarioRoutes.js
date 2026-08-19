const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

// Rotas de usuário
router.post("/cadastro", usuarioController.cadastrar);
router.post("/login", usuarioController.login);

// Rotas de avaliações
router.post("/avaliacoes", usuarioController.avaliar);
router.get("/avaliacoes", usuarioController.listarAvaliacoes);

module.exports = router;