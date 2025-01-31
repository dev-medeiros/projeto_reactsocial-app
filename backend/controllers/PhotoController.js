const Photo = require('../models/Photo');
const User = require('../models/User');

const mongoose = require('mongoose');

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {

    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // create a new photo
    const newPhoto = await Photo.create({
        title,
        image,
        user: user._id,
        userName: user.name,
    });

    // If the photo is created, return data
    if (!newPhoto) {
        res.status(422).json({error: 'Houve um problema ao inserir a foto, tente novamente.'});
    }

    res.status(201).json(newPhoto);
}


module.exports = {
    insertPhoto
};
