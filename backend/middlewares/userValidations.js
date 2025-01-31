// Importa a função 'body' do express-validator para validar os campos da requisição
const { body } = require("express-validator");

// Validação para criação de um usuário
const userCreateValidation = () => {
  return [
    // Valida o campo 'name'
    body("name")
      .isString() // O nome deve ser uma string
      .withMessage("O nome é obrigatório.") // Mensagem de erro personalizada
      .isLength({ min: 3 }) // O nome deve ter pelo menos 3 caracteres
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    // Valida o campo 'email'
    body("email")
      .isString() // O e-mail deve ser uma string
      .withMessage("O e-mail é obrigatório.") // Mensagem de erro personalizada
      .isEmail() // O e-mail deve ser válido
      .withMessage("Insira um e-mail válido"),
    // Valida o campo 'password'
    body("password")
      .isString() // A senha deve ser uma string
      .withMessage("A senha é obrigatória.") // Mensagem de erro personalizada
      .isLength({ min: 5 }) // A senha deve ter pelo menos 5 caracteres
      .withMessage("A senha precisa de no mínimo 5 caracteres."),
    // Valida o campo 'confirmPassword'
    body("confirmPassword")
      .isString() // A confirmação de senha deve ser uma string
      .withMessage("A confirmação de senha é obrigatória.") // Mensagem de erro personalizada
      .custom((value, { req }) => {
        // Verifica se a confirmação de senha é igual à senha original
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

// Validação para login do usuário
const loginValidation = () => {
  return [
    // Valida o campo 'email'
    body("email")
      .isString() // O e-mail deve ser uma string
      .withMessage("O e-mail é obrigatório.") // Mensagem de erro personalizada
      .isEmail() // O e-mail deve ser válido
      .withMessage("Insira um e-mail válido"),
    // Valida o campo 'password'
    body("password")
      .isString() // A senha deve ser uma string
      .withMessage("A senha é obrigatória."), // Mensagem de erro personalizada
  ];
};

// Validação para atualização de dados do usuário
const userUpdateValidation = () => {
  return [
    // Valida o campo 'name' (opcional para atualização)
    body("name")
      .optional() // O nome é opcional durante a atualização
      .isLength({ min: 3 }) // Se fornecido, o nome deve ter pelo menos 3 caracteres
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    // Valida o campo 'password' (opcional para atualização)
    body("password")
      .optional() // A senha é opcional durante a atualização
      .isLength({ min: 5 }) // Se fornecida, a senha deve ter pelo menos 5 caracteres
      .withMessage("A senha precisa de no mínimo 5 caracteres."),
  ];
};

// Exporta as funções de validação para serem usadas em outros arquivos
module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
