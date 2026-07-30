const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.post("/cadastro", usuarioController.cadastrar);
router.post("/login", usuarioController.login);

// //rotas da página de reflexões
// router.post("/reflexoes", diversidadeController.salvarReflexao);
// router.get("/reflexoes", diversidadeController.listarReflexoes);
// router.put("/reflexoes/:id/curtir", diversidadeController.curtirReflexao);

// //rotas da página do quiz
// router.post("/resultados", diversidadeController.salvarReflexao);
// router.get("/resultados", diversidadeController.listarReflexoes);

module.exports = router; 