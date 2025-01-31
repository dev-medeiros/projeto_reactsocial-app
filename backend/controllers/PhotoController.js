// Importa o modelo de foto e mongoose para interagir com o MongoDB
const Photo = require("../models/Photo");
const mongoose = require("mongoose");

// Inserir uma foto no banco de dados com um usuário relacionado a ela
const insertPhoto = async (req, res) => {
  const { title } = req.body;  // Obtém o título da foto
  const image = req.file.filename;  // Obtém o nome do arquivo da foto carregada

  console.log(req.body);  // Exibe o corpo da requisição para depuração

  const reqUser = req.user;  // Obtém o usuário da requisição (autenticado)

  // Busca o usuário no banco de dados
  const user = await User.findById(reqUser._id);

  console.log(user.name);  // Exibe o nome do usuário para depuração

  // Cria a nova foto no banco de dados
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,  // Relaciona a foto ao usuário
    userName: user.name,  // Armazena o nome do usuário junto com a foto
  });

  // Se não for possível criar a foto, retorna erro
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  // Retorna a foto criada com sucesso
  res.status(201).json(newPhoto);
};

// Remover uma foto do banco de dados
const deletePhoto = async (req, res) => {
  const { id } = req.params;  // Obtém o ID da foto na URL

  const reqUser = req.user;  // Obtém o usuário da requisição

  // Busca a foto pelo ID no banco de dados
  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  // Verifica se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Verifica se a foto pertence ao usuário autenticado
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  // Exclui a foto
  await Photo.findByIdAndDelete(photo._id);

  // Retorna sucesso na exclusão
  res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." });
};

// Obter todas as fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])  // Ordena as fotos pela data de criação (mais recentes primeiro)
    .exec();

  return res.status(200).json(photos);
};

// Obter fotos de um usuário específico
const getUserPhotos = async (req, res) => {
  const { id } = req.params;  // Obtém o ID do usuário na URL

  // Busca as fotos relacionadas ao ID do usuário
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])  // Ordena as fotos pela data de criação (mais recentes primeiro)
    .exec();

  return res.status(200).json(photos);
};

// Obter uma foto específica pelo ID
const getPhotoById = async (req, res) => {
  const { id } = req.params;  // Obtém o ID da foto na URL

  // Busca a foto no banco de dados
  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  // Verifica se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Retorna a foto encontrada
  res.status(200).json(photo);
};

// Atualizar uma foto (título e/ou imagem)
const updatePhoto = async (req, res) => {
  const { id } = req.params;  // Obtém o ID da foto na URL
  const { title } = req.body;  // Obtém o título da foto da requisição

  let image;

  // Se uma nova imagem for carregada, usa o novo arquivo
  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;  // Obtém o usuário da requisição

  // Busca a foto pelo ID
  const photo = await Photo.findById(id);

  // Verifica se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Verifica se a foto pertence ao usuário autenticado
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  // Atualiza os campos da foto (título e imagem)
  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  // Salva as alterações no banco de dados
  await photo.save();

  // Retorna a foto atualizada
  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

// Funcionalidade de curtir foto
const likePhoto = async (req, res) => {
  const { id } = req.params;  // Obtém o ID da foto na URL

  const reqUser = req.user;  // Obtém o usuário da requisição

  // Busca a foto pelo ID
  const photo = await Photo.findById(id);

  // Verifica se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Verifica se o usuário já curtiu a foto
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu esta foto."] });
    return;
  }

  // Adiciona o ID do usuário no array de likes
  photo.likes.push(reqUser._id);

  // Salva as alterações
  await photo.save();

  // Retorna sucesso na curtida
  res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });
};

// Funcionalidade de comentar na foto
const commentPhoto = async (req, res) => {
  const { id } = req.params;  // Obtém o ID da foto na URL
  const { comment } = req.body;  // Obtém o comentário da requisição

  const reqUser = req.user;  // Obtém o usuário da requisição

  // Busca o usuário e a foto no banco de dados
  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);

  // Verifica se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Cria o comentário
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  // Adiciona o comentário na foto
  photo.comments.push(userComment);

  // Salva as alterações
  await photo.save();

  // Retorna o comentário adicionado com sucesso
  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

// Funcionalidade de buscar fotos por título
const searchPhotos = async (req, res) => {
  const { q } = req.query;  // Obtém a consulta de busca (q) da query string

  // Busca fotos no banco de dados que tenham o título que corresponda à consulta
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  // Retorna as fotos encontradas
  res.status(200).json(photos);
};

// Exporta as funções do controlador
module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
