const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O campo 'Título' é obrigatório")
      .isString()
      .withMessage("O campo 'Título' é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O campo 'Título' deve ter no minimo 5 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("O campo 'Imagem' é obrigatório");
      }
      return true;
    }),
  ];
};

module.exports = { photoInsertValidation };
