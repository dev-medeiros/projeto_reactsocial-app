// Importa a função de validação do express-validator
const { validationResult } = require("express-validator");

// Função middleware para tratar erros de validação
const validate = (req, res, next) => {
  // Verifica se há erros de validação na requisição
  const errors = validationResult(req);

  // Se não houver erros, passa o controle para o próximo middleware ou função
  if (errors.isEmpty()) {
    return next();
  }

  // Cria um array para armazenar as mensagens de erro
  const extractedErrors = [];

  // Mapeia os erros e extrai as mensagens
  errors.array().map((err) => extractedErrors.push(err.msg));

  // Retorna os erros encontrados com o status 422 (Unprocessable Entity)
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
