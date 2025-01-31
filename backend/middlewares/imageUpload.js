// Importa o multer e path para trabalhar com uploads de arquivos
const multer = require("multer");
const path = require("path");

// Configura o armazenamento para as imagens
const imageStorage = multer.diskStorage({
  // Função que define o destino onde as imagens serão armazenadas
  destination: function (req, file, cb) {
    let folder = "";

    // Verifica o caminho da requisição (baseUrl) para decidir a pasta onde a imagem será salva
    if (req.baseUrl.includes("users")) {
      folder = "users"; // Para usuários, as imagens vão para a pasta "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"; // Para fotos, as imagens vão para a pasta "photos"
    }
    // Define o destino final
    cb(null, `uploads/${folder}/`);
  },

  // Função para definir o nome do arquivo ao salvar
  filename: (req, file, cb) => {
    // O nome do arquivo será composto pela data atual (em milissegundos) + a extensão original
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Configura o multer com o storage configurado e as regras de filtro de arquivo
const imageUpload = multer({
  storage: imageStorage, // Define a configuração de storage para o multer
  fileFilter(req, file, cb) {
    // Verifica se o tipo de arquivo é .png ou .jpg
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Caso o arquivo não seja PNG ou JPG, retorna um erro
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    // Caso o arquivo esteja no formato correto, permite o upload
    cb(undefined, true);
  },
});

// Exporta a configuração de upload para ser usada em outros lugares
module.exports = { imageUpload };
