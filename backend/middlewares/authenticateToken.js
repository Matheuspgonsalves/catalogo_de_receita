const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("Token não fornecido");
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    console.log("Token fornecido:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verificado, payload decodificado:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Erro ao verificar token:", error.message);
    return res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authenticateToken;
