// Importa o express e cria um roteador para definir as rotas relacionadas ao usuário
const express = require("express");
const router = express.Router();

// Controladores: Funções que lidam com as rotas
const {
  register,          // Função para registrar o usuário
  getCurrentUser,    // Função para obter informações do usuário logado
  login,             // Função para fazer login
  update,            // Função para atualizar as informações do usuário
  getUserById,       // Função para buscar o usuário pelo ID
} = require("../controllers/UserController");

// Middlewares: Funções que são executadas antes de chegarem ao controlador
const validate = require("../middlewares/handleValidations");  // Valida as requisições
const {
  userCreateValidation,  // Valida os dados ao registrar um usuário
  loginValidation,       // Valida os dados ao fazer login
  userUpdateValidation,  // Valida os dados ao atualizar o usuário
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard"); // Protege rotas com autenticação
const { imageUpload } = require("../middlewares/imageUpload");  // Middleware para upload de imagem

// Rotas
router.post("/register", userCreateValidation(), validate, register);  // Rota para registrar usuário
router.get("/profile", authGuard, getCurrentUser);  // Rota para obter dados do usuário logado
router.post("/login", loginValidation(), validate, login);  // Rota para login
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),  // Faz upload de imagem de perfil
  update
);  // Rota para atualizar o usuário
router.get("/:id", getUserById);  // Rota para obter usuário pelo ID

// Exporta o roteador para que as rotas sejam usadas no servidor principal
module.exports = router;
