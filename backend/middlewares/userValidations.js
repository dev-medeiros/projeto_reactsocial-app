const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
        .notEmpty()
        .withMessage("Nome é obrigatório")
        .isLength({ min: 4 })
        .withMessage("Nome deve ter no mínimo 4 caracteres"),
    body("email")
        .notEmpty()
        .withMessage("Email é obrigatório")
        .isEmail()
        .withMessage("Insira um email válido"),
    body("password")
        .notEmpty()
        .withMessage("Senha é obrigatória")
        .isLength({ min: 6 })
        .withMessage("Senha deve ter no mínimo 6 caracteres"),
    body("confirmpassword")
        .notEmpty()
        .withMessage("A confirmação de senha é obrigatória")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Senhas não conferem");
            }
            return true;
        }),
    body("bio")
        .notEmpty()
        .withMessage("Biografia é obrigatória"),
  ];
};

module.exports = { userCreateValidation };
