const express = require('express');
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));

//test router
router.get("/", (req, res) => {
    res.send('API Funcionando');
});

module.exports = router;