const express = require("express");
const receitaController = require("../controllers/receitaController");
const router = express.Router();

router.post("/nova-receita", receitaController.criarReceita);
router.get("/receitas", receitaController.listarReceitas);
router.get("/receita/:id", receitaController.buscarReceitaPorId);
router.put("/receita/:id", receitaController.atualizarReceita);
router.delete("/receita/:id", receitaController.removerReceita);

module.exports = router;
