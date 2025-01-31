const express = require("express");
const router = express.Router();

// Controllers
const { register, login, getCurrentUser, update } = require("../controllers/UserController");  // Adicione a importação do update aqui

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const imageUpload = require("../middlewares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/profile", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update); // Agora a função update está definida aqui

module.exports = router;
