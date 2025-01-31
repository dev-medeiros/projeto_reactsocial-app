// Importa o mongoose e o Schema, necessários para definir o modelo de dados
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define o esquema para a coleção 'users' no banco de dados
const userSchema = new Schema(
  {
    // Campos do usuário
    name: String, // Nome do usuário
    email: String, // E-mail do usuário (será usado para login)
    password: String, // Senha do usuário (será armazenada de forma criptografada)
    profileImage: String, // Imagem de perfil do usuário
    bio: String, // Biografia do usuário
  },
  {
    timestamps: true, // Adiciona automaticamente os campos 'createdAt' e 'updatedAt'
  }
);

// Cria o modelo "User" a partir do schema definido
User = mongoose.model("User", userSchema);

// Exporta o modelo "User" para que ele possa ser usado em outras partes do aplicativo
module.exports = User;
