const express = require('express');
const router = express.Router();

// Rotas de usuários, prefixadas com /api/users
router.use("/api/users", require("./UserRoutes"));

// Rota de teste para verificar se a API está funcionando
router.get("/", (req, res) => {
    res.send('API Funcionando');
});

module.exports = router;
