// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa pacotes necessários
const express = require("express");
const path = require("path");
const cors = require("cors");

// Obtém a porta configurada no arquivo .env
const port = process.env.PORT;

// Cria uma instância do aplicativo Express
const app = express();

// Configuração para que o app aceite dados JSON e formulários
app.use(express.json());  // Permite que o app aceite dados no formato JSON
app.use(express.urlencoded({ extended: false }));  // Permite o uso de dados de formulários com codificação URL

// Configuração do CORS (Cross-Origin Resource Sharing) para permitir requisições do frontend
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Definir o diretório para onde as imagens e arquivos são enviados
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));  // Torna o diretório "/uploads" acessível via URL

// Conexão com o banco de dados
require("./config/db.js");

// Rota de teste para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.send("API Working!");  // Resposta simples para garantir que o servidor está funcionando
});

// Importa e usa as rotas definidas no arquivo Router.js
const router = require("./routes/Router.js");
app.use(router);  // Usa as rotas definidas no arquivo "Router.js"

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);  // Exibe uma mensagem no console indicando que o app está rodando
});
