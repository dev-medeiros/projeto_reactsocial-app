// Importa o mongoose e o Schema, que são necessários para definir o modelo de dados
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define o esquema para a coleção 'photos' no banco de dados
const photoSchema = new Schema(
  {
    // Definindo os campos da foto
    image: String, // O nome do arquivo da imagem da foto
    title: String, // O título da foto
    likes: Array, // Um array que armazena os IDs dos usuários que curtiram a foto
    comments: Array, // Um array que armazena os comentários na foto
    userId: mongoose.ObjectId, // O ID do usuário que fez o upload da foto
    userName: String, // O nome do usuário que fez o upload da foto
  },
  {
    timestamps: true, // Adiciona automaticamente os campos 'createdAt' e 'updatedAt'
  }
);

// Cria o modelo "Photo" a partir do schema definido
Photo = mongoose.model("Photo", photoSchema);

// Exporta o modelo "Photo" para que ele possa ser usado em outras partes do aplicativo
module.exports = Photo;
