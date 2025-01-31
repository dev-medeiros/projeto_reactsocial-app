// Importa a função 'body' do express-validator para validar os campos da requisição
const { body } = require("express-validator");

// Validação para inserir uma foto
const photoInsertValidation = () => {
  return [
    // Valida o campo 'title'
    body("title")
      .not()
      .equals("undefined") // Garante que o título não seja "undefined"
      .withMessage("O título é obrigatório") // Mensagem de erro personalizada
      .isString() // O título deve ser uma string
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 }) // O título deve ter pelo menos 3 caracteres
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    // Valida o campo 'image'
    body("image").custom((value, { req }) => {
      // Se não houver um arquivo no campo 'image' (req.file), lança um erro
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

// Validação para atualizar uma foto
const photoUpdateValidation = () => {
  return [
    // Valida o campo 'image', mas ele é opcional
    body("image")
      .optional() // Permite que o campo 'image' seja opcional
      .custom((value, { req }) => {
        // Se o campo 'image' for fornecido, deve conter um arquivo
        if (!req.file) {
          throw new Error("A imagem é obrigatória");
        }
        return true;
      }),
    // Valida o campo 'title' (também opcional)
    body("title")
      .optional() // Permite que o campo 'title' seja opcional
      .isString() // O título deve ser uma string
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 }) // O título deve ter pelo menos 3 caracteres
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  ];
};

// Validação para comentar em uma foto
const commentValidation = () => {
  return [
    // Valida o campo 'comment'
    body("comment")
      .isString() // O comentário deve ser uma string
      .withMessage("O comentário é obrigatório"), // Mensagem de erro personalizada
  ];
};

// Exporta as funções de validação para serem usadas em outros arquivos
module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
