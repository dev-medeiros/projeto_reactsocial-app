// Importa o express e cria o roteador para definir as rotas
const express = require("express");
const router = express.Router();

// Controllers: Funções que gerenciam as operações de cada rota
const {
  insertPhoto,        // Função para inserir uma nova foto
  deletePhoto,        // Função para excluir uma foto
  getAllPhotos,       // Função para obter todas as fotos
  getUserPhotos,      // Função para obter fotos de um usuário específico
  getPhotoById,       // Função para obter uma foto específica pelo ID
  updatePhoto,        // Função para atualizar uma foto
  likePhoto,          // Função para curtir uma foto
  commentPhoto,       // Função para comentar em uma foto
  searchPhotos,       // Função para buscar fotos por título
} = require("../controllers/PhotoController");

// Middlewares: Funções que são executadas antes das funções dos controllers
const authGuard = require("../middlewares/authGuard");        // Middleware para verificar se o usuário está autenticado
const validate = require("../middlewares/handleValidations"); // Middleware para validar as requisições
const {
  photoInsertValidation,    // Validações para inserir foto
  photoUpdateValidation,    // Validações para atualizar foto
  commentValidation,        // Validações para comentar em uma foto
} = require("../middlewares/photoValidations");
const { imageUpload } = require("../middlewares/imageUpload"); // Middleware para upload de imagem

// Definindo as rotas

// Rota POST para adicionar uma nova foto
router.post(
  "/",
  authGuard,                    // Verifica se o usuário está autenticado
  imageUpload.single("image"),   // Realiza o upload da imagem
  photoInsertValidation(),      // Valida os dados para inserir a foto
  validate,                     // Valida a requisição
  insertPhoto                   // Chama a função de inserir foto
);

// Rota DELETE para excluir uma foto pelo ID
router.delete("/:id", authGuard, deletePhoto);

// Rota GET para obter todas as fotos
router.get("/", getAllPhotos);

// Rota GET para obter todas as fotos de um usuário específico pelo ID
router.get("/user/:id", getUserPhotos);

// Rota GET para buscar fotos por título
router.get("/search", searchPhotos);

// Rota GET para obter uma foto específica pelo ID
router.get("/:id", getPhotoById);

// Rota PUT para atualizar uma foto
router.put(
  "/:id",
  authGuard,                    // Verifica se o usuário está autenticado
  imageUpload.single("image"),   // Realiza o upload da imagem
  photoUpdateValidation(),      // Valida os dados para atualizar a foto
  validate,                     // Valida a requisição
  updatePhoto                   // Chama a função de atualizar foto
);

// Rota PUT para curtir uma foto
router.put("/like/:id", authGuard, likePhoto);

// Rota PUT para comentar em uma foto
router.put(
  "/comment/:id",
  authGuard,                  // Verifica se o usuário está autenticado
  commentValidation(),        // Valida os dados do comentário
  validate,                   // Valida a requisição
  commentPhoto                // Chama a função de comentar na foto
);

// Exporta as rotas para que possam ser usadas no servidor
module.exports = router;
