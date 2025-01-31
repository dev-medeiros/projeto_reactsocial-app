const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Gerar token para o usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: 86400,
  });
};

// Registrar usuário e autenticar
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // Gerar hash da senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar usuário
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    // Se a criação do usuário falhar, retorna um erro
    if (!newUser) {
      return res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    }

    // Se o usuário foi criado com sucesso, retorna os dados e o token
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: ["Erro no servidor, tente novamente mais tarde."] });
  }
};

// Login do usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  // Corrigido o erro de digitação
  const user = await User.findOne({ email });

  // Verifica se o usuário existe
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // Verifica se a senha está correta
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(422).json({ error: "Senha inválida" });
  }

  // Retorna os dados e o token
  res.status(200).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Update an user
const update = async (req, res) => {
  // Lógica para atualizar o usuário (pode incluir a imagem de perfil)
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  // Buscando o usuário com base no ID
  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  if (profileImage) {
    user.profileImage = profileImage;  // Atualizando o campo de imagem
  }

  if (bio) {
    // Garantir que a bio seja uma string
    user.bio = Array.isArray(bio) ? bio.join(' ') : bio;
  }

  // Salvando as alterações no usuário
  await user.save();

  // Retornando o usuário atualizado com os novos campos
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,  // Retornando a imagem de perfil
    bio: user.bio,  // Retornando a biografia
  });
};


module.exports = {
  register,
  login,
  getCurrentUser,
  update,
};
