// Importa o express e cria o roteador para definir as rotas principais
const express = require("express");
const router = express();

// Utiliza o roteador para redirecionar as rotas de usuários e fotos
// Quando uma requisição for feita para "/api/users", a rota será direcionada para o arquivo UserRoutes.js
router.use("/api/users", require("./UserRoutes"));

// Quando uma requisição for feita para "/api/photos", a rota será direcionada para o arquivo PhotoRoutes.js
router.use("/api/photos", require("./PhotoRoutes"));

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
