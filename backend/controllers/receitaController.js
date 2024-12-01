const Receita = require("../models/Receita");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const criarReceita = async (req, res) => {
  const { nome, ingredientes, modoPreparo, tempoPreparo, dificuldade } =
    req.body;

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const novaReceita = await Receita.create({
      nome,
      ingredientes,
      modoPreparo,
      tempoPreparo,
      dificuldade,
      userId,
    });

    return res.status(201).json(novaReceita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar a receita." });
  }
};

const listarReceitas = async (req, res) => {
  const { userId } = req.query;

  try {
    const receitas = await Receita.findAll({
      where: userId ? { userId: userId } : {},
    });

    return res.json(receitas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar receitas." });
  }
};

const buscarReceitaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const receita = await Receita.findByPk(id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }
    return res.json(receita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar receita." });
  }
};

const atualizarReceita = async (req, res) => {
  const { id } = req.params;
  const { nome, ingredientes, modoPreparo, tempoPreparo, dificuldade } =
    req.body;

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const receita = await Receita.findByPk(id);

    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }

    if (receita.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para editar esta receita." });
    }

    receita.nome = nome || receita.nome;
    receita.ingredientes = ingredientes || receita.ingredientes;
    receita.modoPreparo = modoPreparo || receita.modoPreparo;
    receita.tempoPreparo = tempoPreparo || receita.tempoPreparo;
    receita.dificuldade = dificuldade || receita.dificuldade;

    await receita.save();

    return res.json(receita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar receita." });
  }
};

const removerReceita = async (req, res) => {
  const { id } = req.params;

  try {
    const receita = await Receita.findByPk(id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }

    await receita.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao remover receita." });
  }
};

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
  atualizarReceita,
  removerReceita,
};
