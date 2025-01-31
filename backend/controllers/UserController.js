// Importa o modelo de usuário e bibliotecas necessárias
const User = require("../models/User");
const bcrypt = require("bcryptjs");  // Para criptografar senhas
const jwt = require("jsonwebtoken");  // Para gerar tokens JWT
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;  // Segredo para criar o token JWT

// Função para gerar o token JWT para o usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",  // O token expira em 7 dias
  });
};

// Registrar um novo usuário e autenticar
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se o usuário já existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Gera o hash da senha
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Cria o novo usuário
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // Se o usuário não for criado, retorna erro
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  // Retorna o usuário criado junto com o token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Obtém os dados do usuário logado
const getCurrentUser = async (req, res) => {
  const user = req.user;  // O usuário é extraído da requisição (autenticado)

  // Retorna os dados do usuário logado
  res.status(200).json(user);
};

// Fazer login do usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário existe
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Verifica se a senha está correta
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] });
    return;
  }

  // Retorna os dados do usuário com o token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Atualizar dados do usuário (nome, senha, imagem de perfil, bio)
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  // Verifica se há uma imagem de perfil carregada
  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;  // O usuário é extraído da requisição

  // Busca o usuário no banco de dados
  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"  // Não retorna a senha do usuário
  );

  // Atualiza os dados do usuário, se presentes na requisição
  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;  // Atualiza a senha do usuário
  }

  if (profileImage) {
    user.profileImage = profileImage;  // Atualiza a imagem de perfil
  }

  if (bio) {
    user.bio = bio;  // Atualiza a biografia
  }

  // Salva as alterações no banco de dados
  await user.save();

  // Retorna os dados do usuário atualizados
  res.status(200).json(user);
};

// Obter os dados de um usuário específico pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params;  // Obtém o ID do usuário na URL

  // Busca o usuário pelo ID e exclui a senha da resposta
  const user = await User.findById(mongoose.Types.ObjectId(id)).select(
    "-password"
  );

  // Verifica se o usuário existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Retorna os dados do usuário
  res.status(200).json(user);
};

// Exporta as funções do controlador para uso em outras partes da aplicação
module.exports = {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
};
