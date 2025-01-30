const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      return res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    }

    // Se o usuário foi criado com sucesso, retorna os dados e o token
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Erro no servidor, tente novamente mais tarde."] });
  }
};

// Login do usuário
const login = (req, res) => {
  res.send("Login");
}


module.exports = {
  register, login,
};
