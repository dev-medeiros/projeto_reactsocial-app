const multer = require('multer');
const path = require('path');

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        if (req.baseUrl === "users") {
            folder = "users";
        } else if (req.baseUrl === "photos") {
            folder = "photos";
        }

        cb(null, `./uploads/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            // upload only png, jpg, and jpeg format
            return cb(new Error('Por favor, faça upload de uma imagem válida (jpg, jpeg, png)'));
        }
        cb(null, true); // Permite o upload caso a imagem seja válida
    }
});

module.exports = imageUpload;
