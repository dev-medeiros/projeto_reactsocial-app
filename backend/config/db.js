require("dotenv").config(); 
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hlu1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectou ao banco de dados!");
    return dbConn;
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados:", error);
  }
};

conn();

module.exports = conn;
