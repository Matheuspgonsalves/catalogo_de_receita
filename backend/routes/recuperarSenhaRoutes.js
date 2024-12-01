const express = require("express");
const router = express.Router();
const recuperarSenhaController = require("../controllers/recuperarSenhaController");

router.post(
  "/solicitar-recuperacao-senha",
  recuperarSenhaController.solicitarRecuperacaoSenha
);
router.patch(
  "/redefinir-senha/:token",
  recuperarSenhaController.redefinirSenha
);

module.exports = router;
