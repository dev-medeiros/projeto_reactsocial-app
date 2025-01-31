const express = require("express");
const router = express.Router();

// Controller
const { insertPhoto } = require("../controllers/PhotoController");

// Middleware
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const imageUpload = require("../middlewares/imageUpload");

// Routes
router.post(
  "/photo",
  authGuard,  // Autentica o usuário
  imageUpload.single("image"),  // Processa a imagem
  photoInsertValidation(),  // Valida os campos
  validate,  // Valida os erros
  insertPhoto  // Controller que insere a foto
);

module.exports = router;
