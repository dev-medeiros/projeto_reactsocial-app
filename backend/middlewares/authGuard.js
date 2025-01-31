// Importa o modelo de usuário e a biblioteca JWT
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;  // Segredo usado para verificar a validade do token

// Função middleware de autenticação
const authGuard = async (req, res, next) => {
  // Obtém o header de autorização da requisição
  const authHeader = req.headers["authorization"];
  // Extrai o token do header (formato esperado: "Bearer token")
  const token = authHeader && authHeader.split(" ")[1];

  // Verifica se o token está presente no header
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Verifica se o token é válido
  try {
    // Verifica e decodifica o token JWT usando o segredo
    const verified = jwt.verify(token, jwtSecret);

    // Se o token for válido, encontra o usuário correspondente
    req.user = await User.findById(verified.id).select("-password");

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (err) {
    // Se o token for inválido, retorna um erro
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;
