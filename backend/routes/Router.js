const express = require('express');
const router = express.Router();

//test router
router.get('/', (req, res) => {
    res.send('API Funcionando');
});

module.exports = router;