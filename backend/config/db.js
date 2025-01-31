// Importa o mongoose para interagir com o banco de dados MongoDB
const mongoose = require("mongoose");

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();  // Permite acessar variáveis como DB_USER e DB_PASS definidas no .env

// Define variáveis para o usuário, senha e nome do banco de dados que serão utilizados para conexão
const dbUser = process.env.DB_USER;  // Usuário do banco de dados
const dbPassword = process.env.DB_PASS;  // Senha do banco de dados
const dbName = "seu_nome_do_banco";  // Nome do banco de dados, substitua por sua escolha

// Função assíncrona para estabelecer a conexão com o banco de dados MongoDB
const conn = async () => {
  try {
    // Conecta ao MongoDB usando a URL com autenticação no MongoDB Atlas
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hlu1e.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectou ao banco de dados!");  // Mensagem indicando sucesso
    return dbConn;  // Retorna a conexão, caso seja necessário em outras partes do código
  } catch (error) {
    // Se ocorrer um erro durante a conexão, ele é capturado e exibido no console
    console.error("Erro de conexão:", error);
  }
};

// Chama a função para estabelecer a conexão ao banco de dados assim que o script é executado
conn();

// Exporta a função de conexão para que possa ser reutilizada em outros módulos
module.exports = conn;
